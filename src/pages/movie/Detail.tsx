import {useParams} from 'react-router-dom';
import {Col, message, Row, Typography} from 'antd';
import {usePostFavorite, usePostWatchlist} from '@/hooks/useAccount';
import {useDetails, useVideos, useReviews, useAccountStates, useCredits} from '@/hooks/useMovies';
import {useConfiguration} from '@/hooks/useConfiguration';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import SystemError from '@/components/layout/SystemError';
import MovieDescriptions from '@/components/MovieDescription';
import MovieTrailer from '@/components/MovieTrailer';
import MovieReview from '@/components/MovieReview';
import CastList from '@/components/CastList';

const {Title} = Typography;

const Detail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const movieId = id ? parseInt(id, 10) : undefined;
  const {data: movie, isLoading: isDetailLoading, isSuccess: isDetailSuccess} = useDetails(movieId);
  const {data: video, isLoading: isVideoLoading, isSuccess: isVideoSuccess} = useVideos(movieId);
  const {data: review, isLoading: isReviewLoading, isSuccess: isReviewSuccess} = useReviews(movieId);
  const {data: credit, isLoading: isCreditLoading, isSuccess: isCreditSuccess} = useCredits(movieId);
  const {data: config, isLoading: isConfigLoading, isSuccess: isConfigSuccess} = useConfiguration();
  const {data: accountState} = useAccountStates(movieId);
  const postWatchMutation = usePostWatchlist();
  const postWatchList = async (id: number) => {
    const watchlist = accountState ? !accountState.watchlist : true;
    await postWatchMutation.mutateAsync({
      media_type: 'movie',
      media_id: id,
      watchlist,
    });

    if (watchlist) message.success('Added to Watch List');
    else message.success('Removed from Watch List');
  };
  const postFavoriteMutation = usePostFavorite();
  const postFavorite = async (id: number) => {
    const favorite = accountState ? !accountState.favorite : true;
    await postFavoriteMutation.mutateAsync({
      media_type: 'movie',
      media_id: id,
      favorite: accountState ? !accountState.favorite : true,
    });

    if (favorite) message.success('Added to Favorites');
    else message.success('Removed from Favorites');
  };

  if (isDetailLoading || isVideoLoading || isConfigLoading) {
    return <LoadingSpinner />;
  }

  if (!isDetailSuccess || !isConfigSuccess || !isVideoSuccess) {
    return <SystemError />;
  }

  return (
    <Row gutter={[0, 60]}>
      <Col>
        <MovieDescriptions
          movie={movie}
          imageBaseUrl={config.images.base_url}
          posterSize={config.images.poster_sizes[2]}
          updateWatchlist={postWatchList}
          updateFavorite={postFavorite}
          accountState={accountState}
        />
      </Col>
      <Col span={24}>
        <Title level={4}>Trailer</Title>
        {isVideoLoading && <LoadingSpinner />}
        {isVideoSuccess && <MovieTrailer videos={video.results}/>}
      </Col>
      <Col span={24}>
        <Title level={4}>Cast & Crew</Title>
        {isCreditLoading && <LoadingSpinner />}
        {isCreditSuccess && <CastList credit={credit} />}
      </Col>
      <Col span={24}>
        <Title level={4}>Comments</Title>
        {isReviewLoading && <LoadingSpinner />}
        {isReviewSuccess && <MovieReview list={review?.results}/>}
      </Col>
    </Row>
  );
};

export default Detail;
