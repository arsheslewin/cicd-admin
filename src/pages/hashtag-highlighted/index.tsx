import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Button, Row, Typography } from 'antd';

import SearchContainer from 'components/SearchContainer';
import useTable from 'hooks/searchContainer/useTable';
import { useModal } from 'hooks/useModal';
import ModalAddHashtag from 'modules/HashtagManagement/components/Modal/ModalAddHashtag';
import ModalSetHashtagCount from 'modules/HashtagManagement/components/Modal/ModalSetHashtagCount';
import SearchGroupHighlighted from 'modules/HashtagManagement/components/SearchGroup/SearchGroupHighlighted';
import TableHighlighted from 'modules/HashtagManagement/components/SearchTable/TableHighlighted';
import useGetHashtagHighlighted from 'modules/HashtagManagement/hooks/useGetHashtagHighlighted';
import { useHashtagActions } from 'store/hashtag-management/selector';
import useHashtagStore from 'store/hashtag-management/useHashtagStore';

import { DEFAULT_SEARCH_PARAMS } from 'constant';
import IconPlusCircle from 'resources/svg/IconPlusCircle';

const { Title } = Typography;

const HashtagHighlighted: FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
  const [dataSource, setDataSource] = useState<any>([]);

  const { isLoading, reload } = useGetHashtagHighlighted(searchParams);

  const { setHighlighted } = useHashtagActions();
  const { highlighted } = useHashtagStore();
  const { list, total } = highlighted || {};

  const { open, onToggleModal } = useModal();
  const { open: openAddHashTag, onToggleModal: onToggleAddHashtag } = useModal();

  const { isSearching } = useTable({
    searchParams,
    setSearchParams,
    setSort: undefined,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  });

  const reloadHighlighted = () => {
    setDataSource([]);

    if (JSON.stringify(searchParams) === JSON.stringify(DEFAULT_SEARCH_PARAMS)) {
      reload();
    } else {
      setSearchParams(DEFAULT_SEARCH_PARAMS);
    }
  };

  useEffect(() => {
    if (isSearching && searchParams?.page === 1) {
      setDataSource([]);
    }
  }, [searchParams, isSearching]);

  useEffect(() => {
    const newList = [...dataSource, ...list]?.map((item: any, index: number) => ({ ...item, key: index + 1 }));
    setDataSource(newList);
  }, [JSON.stringify(list)]);

  useEffect(() => {
    return () => {
      setHighlighted({ list: [], total: 0 });
    };
  }, []);

  return (
    <div className='user-management'>
      <Row align='top' justify='space-between'>
        <Title level={1}>{t('common.hashtag_highlighted')}</Title>
        <div className='flex'>
          <Button className='app-button' onClick={onToggleModal}>
            {t('common.set_hashtag_count')}
          </Button>
          <Button className='app-button ml-4' icon={<IconPlusCircle className='mr-2' />} onClick={onToggleAddHashtag}>
            {t('common.add_hashtag')}
          </Button>
        </div>
      </Row>
      <div className='container'>
        <SearchContainer searchParams={searchParams} setSearchParams={setSearchParams}>
          <SearchGroupHighlighted setDataSource={setDataSource} />
          <span>
            <Title level={5}>
              {t('common.total_hashtag')}: <NumericFormat displayType='text' value={total} thousandSeparator />
            </Title>
          </span>
          <TableHighlighted
            isLoading={isLoading}
            isSearching={isSearching}
            total={total}
            dataSource={dataSource}
            setDataSource={setDataSource}
            reloadHighlighted={reloadHighlighted}
          />
        </SearchContainer>
      </div>
      <ModalSetHashtagCount open={open} onToggleModal={onToggleModal} />
      <ModalAddHashtag open={openAddHashTag} onToggleModal={onToggleAddHashtag} reloadHighlighted={reloadHighlighted} />
    </div>
  );
};

export default HashtagHighlighted;
