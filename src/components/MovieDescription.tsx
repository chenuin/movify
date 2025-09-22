import {Divider, Tag, Rate, Typography, Space, Row, Col, Flex, Button, Empty} from 'antd';
import {CheckOutlined, HeartFilled, HeartOutlined, PlusOutlined} from '@ant-design/icons';
import {convertToFiveStarRating, getImageUrl} from '@/libs/tmdb';
import type {Movie, AccountStateResponse} from '@/hooks/useMovies';
import {useState} from 'react';

const {Title, Paragraph, Text} = Typography;
interface Props {
  movie: Movie
  imageBaseUrl: string
  posterSize: string
  accountState: AccountStateResponse | undefined
  updateWatchlist: (id: number) => void
  updateFavorite: (id: number) => void
}

const MovieDescriptions: React.FC<Props> = (props) => {
  const [isWatchLoading, setIsWatchLoading] = useState<boolean>(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState<boolean>(false);
  const {imageBaseUrl, posterSize, movie, accountState, updateWatchlist, updateFavorite} = props;
  const fiveStarRating = convertToFiveStarRating(movie.vote_average);

  const clickWatchList = async () => {
    try {
      setIsWatchLoading(true);
      await updateWatchlist(movie.id);
    } finally {
      setIsWatchLoading(false);
    }
  };
  const clickFavorite = async () => {
    try {
      setIsFavoriteLoading(true);
      await updateFavorite(movie.id);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <Row gutter={[20, 40]}>
      <Col md={8} sm={24}>
        {
          movie.poster_path ? (
            <Flex justify="center">
              <img
                src={getImageUrl(imageBaseUrl, posterSize, movie.poster_path)}
              />
            </Flex>
          ) :
            <Empty />
        }
      </Col>
      <Col md={16} sm={24}>
        <Space size="middle" direction="vertical">
          {
            movie.vote_count !== 0 && (
              <Space>
                <Rate allowHalf disabled defaultValue={fiveStarRating} /> 
                {`${fiveStarRating} / 5.0 (${movie.vote_count} votes)`}
              </Space>
            )
          }
          <Title level={2}>{movie.title}</Title>
          {
            (movie.title !== movie.original_title) && <Text>{movie.original_title}</Text>
          }
          <div>
            {movie.genres.map(genre => (
              <Tag
                key={genre.id}
                color="red"
                bordered={false}
              >
                {genre.name}
              </Tag>
            ))}
          </div>
          <Space>
            <Tag color="blue">{movie.status}</Tag>
            <span>{movie.release_date}</span>
            {movie.runtime !== 0 && `∙ ${movie.runtime} minutes`}
          </Space>
          <Space>
            <Button
              icon={accountState?.watchlist ? <CheckOutlined /> : <PlusOutlined />}
              loading={isWatchLoading}
              onClick={clickWatchList}
            >
              Watch list
            </Button>
            <Button
              icon={accountState?.favorite ? <HeartFilled /> : <HeartOutlined />}
              loading={isFavoriteLoading}
              color="red"
              variant="outlined"
              onClick={clickFavorite}
            >
              Favorite
            </Button>
          </Space>
        </Space>
      </Col>
      <Col md={24}>
        <Divider />
        <Title level={4}>Summary</Title>
        {movie.tagline && <Title level={5}>{movie.tagline}</Title>}
        <Paragraph>{movie.overview}</Paragraph>
      </Col>
    </Row>
  );
};

export default MovieDescriptions;
