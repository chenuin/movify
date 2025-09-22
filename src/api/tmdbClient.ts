import {useQuery} from '@tanstack/react-query';
import ky from 'ky';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TBDB_URL = import.meta.env.VITE_TMDB_URL;

export const tmdb = ky.create({
  prefixUrl: TBDB_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: 'application/json',
  },
});

export const useAuthentication = <T = object>() => (
  useQuery({
    queryKey: ['authentication'],
    queryFn: () => tmdb.get('authentication').json<T>(),
  })
);
