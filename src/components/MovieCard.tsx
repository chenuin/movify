import React, {useMemo} from 'react';
import {Card, Empty, Space, Flex, Tag, Avatar, Skeleton} from 'antd';
import {Link} from 'react-router-dom';
import {} from '@ant-design/icons';
import {getImageUrl, convertToFiveStarRating} from '@/libs/tmdb';
import {useConfiguration} from '@/hooks/useConfiguration';
import {useGetMovieList} from '@/hooks/useGenres';
import LazyImage from './ui/LazyImage';

interface Props {
  id: number
  title: string
  posterPath: string | null
  vote: number
  genresIds: number[]
  actions?: React.ReactNode[]
}

const MovieCard: React.FC<Props> = ({id, title, posterPath, vote, genresIds, actions}) => {
  const {data: config, isLoading: isConfigLoading, isSuccess: isConfigSuccess} = useConfiguration();
  const {data: genresMovie} = useGetMovieList();

  const genresMap = useMemo(() => {
    return genresMovie?.reduce((carry: Record<number, string>, item) => {
      carry[item.id] = item.name;

      return carry;
    }, {});
  }, [genresMovie]);

  if (isConfigLoading) return <Skeleton />;
  
  return (
    <Card
      cover={(
        <div style={{position: 'relative', height: 350}}>
          {
            (posterPath && isConfigSuccess) ?
              <LazyImage
                alt={title}
                src={getImageUrl(config.images.base_url, config.images.poster_sizes[2], posterPath)}
              /> :
              <Empty />
          }
          <Flex
            gap="small"
            vertical
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
              zIndex: 10,
            }}
          >
            <Avatar
              size="large"
              style={{backgroundColor: 'black'}}
            >
              {convertToFiveStarRating(vote)}
            </Avatar>
            {actions}
          </Flex>
        </div>
      )}
    >
      <Space
        size="small"
        direction="vertical"
      >
        {
          genresMap &&
          <Flex gap={4} wrap align="start">
            {genresIds.map((id,idx) => (
              <Tag
                key={idx}
                color="red"
                bordered={false}
              >
                {genresMap[id]}
              </Tag>
            ))}
          </Flex>
        }
        <Link to={`/movie/detail/${id}`}>{title}</Link>
      </Space>
    </Card>
  );
};

export default MovieCard;
