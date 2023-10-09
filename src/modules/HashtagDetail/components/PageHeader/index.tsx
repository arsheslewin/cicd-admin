import { useLocation, useNavigate } from 'react-router-dom';

import { PageHeader } from 'antd';
import { ROUTE_URL } from 'routes';

import IconArrowLeft from 'resources/svg/IconArrowLeft';

interface IProps {
  detail: any;
}

const PageHead: React.FC<IProps> = ({ detail }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const doesAnyHistoryEntryExist = location.key !== 'default';

  const onBack = () => {
    if (doesAnyHistoryEntryExist) {
      navigate(-1);
    } else {
      navigate(ROUTE_URL.HASHTAGS_HIGHLIGHTED);
    }
  };

  const IconBack = () => (
    <div className='icon-back'>
      <IconArrowLeft />
    </div>
  );

  return <PageHeader backIcon={IconBack()} onBack={onBack} title={detail?.allTimeData?.hashtag} />;
};

export default PageHead;
