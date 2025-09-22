
import {useInfiniteQuery} from '@tanstack/react-query';
import {tmdb} from '@/api/tmdbClient';
import type {Movie} from './types';

interface SearchParams {
  include_adult: boolean;
  include_video: boolean;
  language: string;
  page: number;
  sort_by: 'popularity.desc';
  with_genres: string;
}

interface DiscoverMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const defaultConfig: Partial<SearchParams> = {
  include_adult: false,
  include_video: false,
  language: 'en-Us',
  page: 1,
  sort_by: 'popularity.desc',
};

export const useDiscoverMovie = <T extends DiscoverMovieResponse>(inputSearchParams: Partial<SearchParams>, enabled: boolean) => {
  const searchParams = {
    ...defaultConfig,
    ...inputSearchParams,
  };

  return useInfiniteQuery({
    queryKey: ['discover', 'movie', searchParams],
    initialPageParam: 1,
    queryFn: ({pageParam}) => tmdb.get('discover/movie', {searchParams: {...searchParams, page: pageParam}}).json<T>(),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;

      return nextPage;
    },
    enabled,
  });
};
