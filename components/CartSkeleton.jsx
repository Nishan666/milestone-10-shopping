import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => (
  <div className="flex justify-between py-1">
    <div className="flex">
      <Skeleton className="object-cover h-24 w-24 rounded-md" width={100} height={100}  />
      <div className="px-5 py-1">
        <Skeleton width={150} height={24} />
        <div className="py-1">
          <Skeleton width={100} height={24} />
        </div>
      </div>
    </div>
    <div className="flex gap-2 items-center">
      <Skeleton width={75} height={32} />
      <Skeleton width={32} height={32} />
      <Skeleton width={24} height={24} />
      <Skeleton width={32} height={32} />
    </div>
  </div>
);

export default ProductSkeleton;
