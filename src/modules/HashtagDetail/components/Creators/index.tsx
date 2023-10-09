import React from 'react';
import { useTranslation } from 'react-i18next';

import TableCommon from 'components/Table';
import columnsCreator from 'modules/HashtagDetail/constants/column';

interface IProps {
  detail: any;
}

const HashtagCreators: React.FC<IProps> = ({ detail }) => {
  const { t } = useTranslation();

  const { allTimeData, creators } = detail || {};

  return (
    <section className='hashtag-creators px-40 mt-40'>
      <h5 className='h5 color-black'>{t('common.creator_who_post', { hashtag: allTimeData?.hashtag })}</h5>
      <TableCommon columns={columnsCreator(t)} dataSource={creators} showPagination={false} />
    </section>
  );
};

export default HashtagCreators;
