import React, { Dispatch, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { throttle } from 'lodash';

import showMessage from 'components/Message';
import TableCommon from 'components/Table';
import { HIGHLIGHT_DISPLAY, KEY_DRAG_ROW_TABLE } from 'modules/HashtagManagement/constants';
import columnsHighlighted from 'modules/HashtagManagement/constants/columns-highlighted';
import useFetchHashtag from 'modules/HashtagManagement/hooks/useFetchHashTag';

import { TYPE_CONSTANTS } from 'constant';

import TableRow from './TableRow';

interface IProps {
  isLoading: boolean;
  isSearching: boolean;
  dataSource: any;
  total: number;
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setDataSource: Dispatch<any>;
  reloadHighlighted: () => void;
}

const DragSortTable: React.FC<IProps> = ({
  isLoading,
  isSearching,
  dataSource,
  total,
  searchParams,
  setSearchParams,
  setDataSource,
  reloadHighlighted,
}) => {
  const { t } = useTranslation();
  const tableRef = useRef<any>(null);
  const scrollParent = tableRef?.current?.querySelector('.ant-table-body');

  const { orderHashtag, setDisplayHashtag, setHighlight } = useFetchHashtag();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const previous = [...dataSource];
      const activeIndex = previous.findIndex((i: any) => i.key === active.id);
      const overIndex = previous.findIndex((i: any) => i.key === over?.id);
      const newList = arrayMove(previous, activeIndex, overIndex);

      setDataSource(newList);

      //update order
      const newOrder = newList?.map((item: any, index: number) => ({ id: item?.id, order: index + 1 }));
      orderHashtag(newOrder);
    }
  };

  const handleDisplay = (id: string) => async (checked: boolean) => {
    try {
      const res = await setDisplayHashtag(id);

      if (res) {
        const newList = dataSource?.map((item: any) => {
          if (item?.id !== id) return item;

          return {
            ...item,
            isDisplay: checked ? HIGHLIGHT_DISPLAY.YES : HIGHLIGHT_DISPLAY.NO,
          };
        });

        setDataSource(newList);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const handleDelete = async (id: string) => {
    //remove hashtag from highligh to trending
    try {
      const res = await setHighlight(id);

      if (res) {
        reloadHighlighted();

        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'message.S8');
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const checkLoadMore = throttle((e: any) => {
    const clientHeight = e?.target?.clientHeight;
    const scrollHeight = e?.target?.scrollHeight;
    const scrollTop = e?.target?.scrollTop;
    const isNearTheBottom = clientHeight + scrollTop >= (9 / 10) * scrollHeight;

    if (isNearTheBottom && total > dataSource?.length) {
      //load more data
      setSearchParams && setSearchParams((prev: any) => ({ ...prev, page: prev?.page + 1 }));
    }
  }, 1000);

  useEffect(() => {
    if (scrollParent) {
      scrollParent?.addEventListener('scroll', checkLoadMore);
    }

    return () => {
      scrollParent?.removeEventListener('scroll', checkLoadMore);
      checkLoadMore.cancel();
    };
  }, [scrollParent, dataSource, searchParams]);

  return (
    <>
      {Number(total) > 0 ? (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource?.map((i: any) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              ref={tableRef}
              components={{
                body: {
                  row: TableRow,
                },
              }}
              rowKey='key'
              columns={
                isSearching
                  ? columnsHighlighted(t, handleDisplay, handleDelete).filter((col) => col.key !== KEY_DRAG_ROW_TABLE)
                  : columnsHighlighted(t, handleDisplay, handleDelete)
              }
              dataSource={dataSource || [{}]}
              pagination={false}
              loading={isLoading}
              showHeader={false}
              scroll={{ y: 594 }}
            />
          </SortableContext>
        </DndContext>
      ) : (
        // if dataSource empty -> DragSortTable is not working with form search (specify: FormSelect)
        // solution: don't set dataSource empty, render other table empty
        <TableCommon
          columns={undefined}
          dataSource={[]}
          pagination={false}
          loading={isLoading}
          showHeader={false}
          showPagination={false}
          scroll={{ y: 594 }}
        />
      )}
    </>
  );
};

export default DragSortTable;
