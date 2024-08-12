import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const SkeletonArticle = () => {
  return (
    <div>
      <h1><Skeleton width={300} /></h1>
      <h2><Skeleton width={200} /></h2>
      <Skeleton height={200} />
      <p><Skeleton count={5} /></p>
      <p><Skeleton width={100} /></p>
    </div>
  );
};

export default SkeletonArticle;
