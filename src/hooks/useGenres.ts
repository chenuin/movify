import {useQuery} from '@tanstack/react-query';
import {tmdb} from '@/api/tmdbClient';

interface Genres {
  genres: {
    id: number;
    name: string;
  }[]
}

export const useGetMovieList = () => (
  useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: async () => {
      const {genres} = await tmdb.get('genre/movie/list').json<Genres>();

      return genres;
    },
  })
);