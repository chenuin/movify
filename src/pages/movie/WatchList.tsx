import {useState} from 'react';
import {Row, Col, message, Button, Flex, Spin, Segmented} from 'antd';
import {CaretDownOutlined, CaretUpOutlined, DeleteOutlined} from '@ant-design/icons';
import {useGetWatchlist, usePostWatchlist} from '@/hooks/useAccount';
import {useInfiniteScroll} from '@/hooks/useInfiniteScroll';
import MovieCard from '@/components/MovieCard';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import SystemError from '@/components/layout/SystemError';

interface SortOption {
  label: string;
  value: 'created_at.asc' | 'created_at.desc';
  icon: React.ReactNode;
}

const Explore: React.FC = () => {
  const [sort, setSort] = useState<SortOption['value']>('created_at.asc');
  const {
    data: watchlist,
    isLoading,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetWatchlist({sort_by: sort});
  const postWatchMutation = usePostWatchlist();
  const postWatchList = async (id: number) => {
    await postWatchMutation.mutateAsync({
      media_type: 'movie',
      media_id: id,
      watchlist: false,
    });

    message.success('Success!');
  };

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!isSuccess) return <SystemError />;

  const getActions = (id: number) => [
    <Button
      key="key"
      icon={<DeleteOutlined />}
      shape="circle"
      variant="solid"
      color="danger"
      size="large"
      onClick={() => postWatchList(id)}
    />,
  ];

  const options: SortOption[] = [
    {label: 'Ascending', value: 'created_at.asc', icon: <CaretUpOutlined />},
    {label: 'Descending', value: 'created_at.desc', icon: <CaretDownOutlined />},
  ];

  return (
    <Row
      justify="start"
      gutter={[20, 20]}
    >
      <Col span={24}>
        <Segmented
          value={sort}
          options={options}
          onChange={setSort}
        />
      </Col>
      {
        watchlist.pages.flatMap((page) => page.results.map((item, idx) => (
          <Col
            key={`${item.id}-${idx}`}
            md={6}
            sm={12}
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
        )))
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

export default Explore;
