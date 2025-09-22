
import {useInfiniteQuery} from '@tanstack/react-query';
import {tmdb} from '@/api/tmdbClient';
import type {Movie} from './types';

interface SearchParams {
  query: string | undefined;
}

interface SearchMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const useSearchMovie = <T extends SearchMovieResponse>(searchParams: SearchParams, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['search', 'movie', searchParams],
    initialPageParam: 1,
    queryFn: ({pageParam}) => tmdb.get('search/movie', {searchParams: {...searchParams, page: pageParam}}).json<T>(),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;

      return nextPage;
    },
    enabled: enabled,
  });
};
