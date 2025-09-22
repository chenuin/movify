import {useQuery} from '@tanstack/react-query';
import {tmdb} from '@/api/tmdbClient';

interface Config {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  }
  change_keys: string[];
}

export const useConfiguration = () => (
  useQuery({
    queryKey: ['configuration'],
    queryFn: () => tmdb.get('configuration').json<Config>(),
  })
);
