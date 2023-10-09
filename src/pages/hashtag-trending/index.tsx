import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Typography } from 'antd';

import SearchContainer from 'components/SearchContainer';
import SearchGroupTrending from 'modules/HashtagManagement/components/SearchGroup/SearchGroupTrending';
import TableTrending from 'modules/HashtagManagement/components/SearchTable/TableTrending';
import { TRENDING_OPTION } from 'modules/HashtagManagement/constants';
import useGetHashtagTrending from 'modules/HashtagManagement/hooks/useGetHashtagTrending';
import useHashtagStore from 'store/hashtag-management/useHashtagStore';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

const { Title } = Typography;

const HashtagTrending: FC = () => {
  const { t } = useTranslation();

  const [sort, setSort] = useState({});
  const [searchParams, setSearchParams] = useState({
    ...DEFAULT_SEARCH_PARAMS,
    trendingDate: TRENDING_OPTION[0].value,
  });

  const { trending } = useHashtagStore();
  const { total } = trending || {};

  const { isLoading } = useGetHashtagTrending(searchParams);

  return (
    <div className='user-management'>
      <Title level={1}>{t('common.hashtag_trending')}</Title>
      <div className='container'>
        <SearchContainer sort={sort} searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams}>
          <SearchGroupTrending />
          <span>
            <Title level={5}>
              {t('common.total_hashtag')}: <NumericFormat displayType='text' value={total} thousandSeparator />
            </Title>
          </span>
          <TableTrending isLoading={isLoading} />
        </SearchContainer>
      </div>
    </div>
  );
};

export default HashtagTrending;
