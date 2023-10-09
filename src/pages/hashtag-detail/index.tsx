import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import HashtagCreators from 'modules/HashtagDetail/components/Creators';
import HashtagInsights from 'modules/HashtagDetail/components/Insights';
import PageHead from 'modules/HashtagDetail/components/PageHeader';
import useFetchHashtagDetail from 'modules/HashtagDetail/hooks/useFetchHashtagDetail';
import { TRENDING_OPTION } from 'modules/HashtagManagement/constants';

const HashtagDetail: React.FC = () => {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useState({ id, trendingDate: TRENDING_OPTION[0]?.value });
  const { detail } = useFetchHashtagDetail(searchParams);

  return (
    <div className='hashtag-detail'>
      <PageHead detail={detail} />
      <HashtagInsights detail={detail} setSearchParams={setSearchParams} />
      <HashtagCreators detail={detail} />
    </div>
  );
};

export default HashtagDetail;
