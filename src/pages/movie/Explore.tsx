import {Input, Col, Row, Button, Select, Flex, Spin, Space, message} from 'antd';
import {FilterOutlined, PlusOutlined} from '@ant-design/icons';
import {useDiscoverMovie} from '@/hooks/useDiscover';
import {useGetMovieList} from '@/hooks/useGenres';
import {usePostWatchlist} from '@/hooks/useAccount';
import {useSearchMovie} from '@/hooks/useSearch';
import {useInfiniteScroll} from '@/hooks/useInfiniteScroll';
import MovieCard from '@/components/MovieCard';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import SystemError from '@/components/layout/SystemError';
import {useMemo, useState} from 'react';
import {useDebounce} from '@/hooks/useDebounce';

interface MovieListProps {
  withGenres: number | undefined
  query: string | undefined
}

const MovieList: React.FC<MovieListProps> = ({withGenres, query}) => {
  const isSearchMode = useMemo(() => !!query, [query]);
  const discoverResult = useDiscoverMovie(
    withGenres ? {with_genres: withGenres.toString()} : {},
    !isSearchMode,
  );
  const searchResult = useSearchMovie(
    {query: query!},
    isSearchMode,
  );
  const {
    data: movie,
    isLoading: isMovieLoading,
    isSuccess: isMoviesSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMemo(
    () => isSearchMode ? searchResult : discoverResult,
    [isSearchMode, searchResult, discoverResult],
  );
  const displayMovie = useMemo(() => {
    return isSearchMode && withGenres ?
      movie?.pages.flatMap(page => page.results.filter(({genre_ids = []}) => genre_ids.includes(withGenres))) :
      movie?.pages.flatMap(page => page.results);
  }, [isSearchMode, withGenres, movie]);

  const postWatchMutation = usePostWatchlist();
  const postWatchList = async (id: number) => {
    await postWatchMutation.mutateAsync({
      media_type: 'movie',
      media_id: id,
      watchlist: true,
    });

    message.success('Success!');
  };

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const getActions = (id: number) => [
    <Button
      key="add"
      icon={<PlusOutlined />}
      shape="circle"
      size="large"
      onClick={() => postWatchList(id)}
    />,
  ];

  if (isMovieLoading) {
    return <LoadingSpinner />;
  }

  if (!isMoviesSuccess) {
    return <SystemError />;
  }

  return (
    <Row
      justify="start"
      gutter={[20, 20]}
    >
      {
        displayMovie?.map((item, idx) => (
          <Col
            key={`${item.id}-${idx}`}
            sm={12}
            md={6}
          >
            <MovieCard
              id={item.id}
              title={item.title}
              posterPath={item.poster_path}
              vote={item.vote_average}
              genresIds={item.genre_ids}
              actions={getActions(item.id)}
            />
          </Col>
        ))
      }
      <Col
        ref={loadMoreRef}
        span={24}
      >
        {
          isFetchingNextPage && (
            <Flex justify="center">
              <Spin />
            </Flex>
          )
        }
      </Col>
    </Row>
  );
};

const Explore: React.FC = () => {
  const [withGenres, setWithGenres] = useState<number>();
  const [rawQuery, setRawQuery] = useState<string>();
  const debouncedQuery = useDebounce(rawQuery, 500);
  const {data: genres, isLoading: isGenresLoading, isSuccess: isGenresSuccess} = useGetMovieList();

  const options = useMemo(() => genres?.map(({id, name}) => ({
    value: id,
    label: name,
  })), [genres]);


  if (isGenresLoading) {
    return <LoadingSpinner />;
  }

  if (!isGenresSuccess) {
    return <SystemError />;
  }

  return (
    <Space
      direction="vertical"
      size={40}
      style={{width: '100%'}}
    >
      <Flex
        gap="small"
        align="center"
      >
        <Select
          placeholder={<><FilterOutlined /> Filter</>}
          style={{width: 160}}
          value={withGenres}
          variant="filled"
          options={options}
          onChange={setWithGenres}
          allowClear
        />
        <Input.Search
          placeholder="Input Keyword"
          variant="filled"
          onChange={(e) => setRawQuery(e.target.value.trim() || undefined)}
          allowClear
        />
      </Flex>
      <MovieList
        withGenres={withGenres}
        query={debouncedQuery}
      />
    </Space>
  );
};

export default Explore;