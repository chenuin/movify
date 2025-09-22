import {tmdb} from '@/api/tmdbClient';
import {useQuery} from '@tanstack/react-query';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string; // The format is 'YYYY-MM-DD'
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
};

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface Review  {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface AccountStateResponse {
  id: number;
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}

export interface Member {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastMember extends Member {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember extends Member {
  department: number;
  job: number;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export const useDetails = (movieId : number | undefined) => (
  useQuery({
    queryKey: ['movie', movieId, 'detail'],
    queryFn: async () => tmdb.get(`movie/${movieId}`).json<Movie>(),
    enabled: !!movieId,
  })
);

export const useVideos = (movieId : number | undefined) => (
  useQuery({
    queryKey: ['movie', movieId, 'video'],
    queryFn: async () => tmdb.get(`movie/${movieId}/videos`).json<MovieVideosResponse>(),
    enabled: !!movieId,
  })
);

export const useReviews = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId, 'review'],
    queryFn: () => tmdb.get(`movie/${movieId}/reviews`).json<ReviewResponse>(),
    enabled: !!movieId,
  });
};

export const useAccountStates = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId, 'account-states'],
    queryFn: () => tmdb.get(`movie/${movieId}/account_states`).json<AccountStateResponse>(),
    enabled: !!movieId,
  });
};

export const useCredits = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => tmdb.get(`movie/${movieId}/credits`).json<CreditsResponse>(),
    enabled: !!movieId,
  });
};
