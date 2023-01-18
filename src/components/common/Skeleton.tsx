import React, { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SkeletonProps {
  rows: number
}

const makeClassName = (): string => {
  return `h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-${(Math.floor(Math.random()*3)) +8}/12 mb-2`
}

export const Skeleton = ({rows}: SkeletonProps): ReactElement => {
  return (
    <div role="status" className="w-full animate-pulse py-3">
    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-6/12 mb-2"></div>
      <>
        {Array.from(Array(rows -1)).map((row,i) => 
          <div key={`skel${i}`} className={makeClassName()}></div>
        )}
      </>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
