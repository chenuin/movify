import {Row, Col} from 'antd';
import type {MovieVideo} from '@/hooks/useMovies';
import YouTubeEmbed from './ui/YouTubeEmbed';

interface MovieTrailerProps {
  videos: MovieVideo[]
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({videos}) => {
  return (
    <Row gutter={[20, 40]}>
      {
        videos.map((item, idx) => (
          item.site === 'YouTube' && (
            <Col
              key={`${item.id}-${idx}`}
              md={8}
              xs={12}
            >
              <YouTubeEmbed
                videoKey={item.key}
                title={item.name}
              />
            </Col>
          )
        ))
      }
    </Row>
  );
};

export default MovieTrailer;
