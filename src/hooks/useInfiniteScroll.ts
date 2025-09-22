import {useRef, useEffect} from 'react';
import type {UseInfiniteQueryResult} from '@tanstack/react-query';

interface InfiniteScrollHookProps {
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
  hasNextPage: UseInfiniteQueryResult['hasNextPage'];
  isFetchingNextPage: UseInfiniteQueryResult['isFetchingNextPage'];
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollHookProps) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return loadMoreRef;
};
