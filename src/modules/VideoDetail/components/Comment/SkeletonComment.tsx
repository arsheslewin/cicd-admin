import { Skeleton } from 'antd';

const SkeletonComment = () => {
  return (
    <div className='skeleton-comment'>
      <Skeleton avatar paragraph={{ rows: 2 }} active />;
      <Skeleton avatar paragraph={{ rows: 2 }} active />;
      <Skeleton avatar paragraph={{ rows: 2 }} active />;
    </div>
  );
};

export default SkeletonComment;
