import {useQuery, useInfiniteQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {tmdb} from '@/api/tmdbClient';
import type {Movie} from './types';

const ACCOUNT_ID = import.meta.env.VITE_ACCOUNT_ID;

interface Media {
  media_type: 'movie' | 'tv';
  media_id: number;
}

interface Status {
  status_code: number;
  status_message: string;
}

interface WatchlistResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const useGetWatchlist = (searchParams = {}) => (
  useInfiniteQuery({
    queryKey: ['account', 'watchlist', searchParams],
    initialPageParam: 1,
    queryFn: ({pageParam}) => tmdb.get(`account/${ACCOUNT_ID}/watchlist/movies`, {searchParams: {...searchParams, page: pageParam}}).json<WatchlistResponse>(),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;

      return nextPage;
    },
  })
);

export const usePostWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (json: Media & {watchlist: boolean}) => tmdb.post('account/22312993/watchlist', {json}).json<Status>(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['account', 'watchlist']});
      queryClient.invalidateQueries({queryKey: ['movie', variables.media_id, 'account-states']});
    },
  });
};

export const useGetMovieStatus = () => (
  useQuery({
    queryKey: ['account', 'watchlist'],
    queryFn: () => tmdb.get(`account/${ACCOUNT_ID}/watchlist/movies`).json<WatchlistResponse>(),
  })
);

export const usePostFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (json: Media & {favorite: boolean}) => tmdb.post('account/22312993/favorite', {json}).json<Status>(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['account', 'favorite']});
      queryClient.invalidateQueries({queryKey: ['movie', variables.media_id, 'account-states']});
    },
  });
};
