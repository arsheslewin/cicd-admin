import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Typography } from 'antd';

import SearchContainer from 'components/SearchContainer';
import SearchGroup from 'modules/VideoManagement/components/SearchGroup';
import SearchTable from 'modules/VideoManagement/components/SearchTable';
import useGetVideoList from 'modules/VideoManagement/hooks/useGetVideoList';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

const { Title } = Typography;

interface IProps {
  creatorId?: string;
}

const VideoManagement: FC<IProps> = ({ creatorId }) => {
  const { t } = useTranslation();

  const [sort, setSort] = useState({});
  const [searchParams, setSearchParams] = useState({ ...DEFAULT_SEARCH_PARAMS, userId: creatorId });

  const { total, videoList, isLoading } = useGetVideoList(searchParams);

  const dataSource = useMemo(
    () =>
      videoList?.map((item: any) => ({
        ...item,
        creator: {
          avatar: item?.avatar,
          displayname: item?.displayname || t('common.anonymous_user'),
          username: item?.username,
        },
        action: {
          videoId: item?.id,
        },
      })),
    [videoList],
  );

  return (
    <div className='video-management'>
      {!creatorId && <Title level={1}>{t('common.video_management')}</Title>}
      <div className='container'>
        {creatorId && <div className='h5 color-black mb-12'>{t('common.video_list')}</div>}
        <SearchContainer sort={sort} searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams}>
          <SearchGroup isChangePlaceholder={!!creatorId} />
          <span>
            <Title level={5}>
              {t('common.total_video')}: <NumericFormat displayType='text' value={total} thousandSeparator />
            </Title>
          </span>
          <SearchTable hideCreator={!!creatorId} total={total} dataSource={dataSource} isLoading={isLoading} />
        </SearchContainer>
      </div>
    </div>
  );
};

export default VideoManagement;
