import {Carousel, Typography, Button, Flex, Grid} from 'antd';
import {Link} from 'react-router-dom';
import {useConfiguration} from '@/hooks/useConfiguration';
import {useDiscoverMovie} from '@/hooks/useDiscover';
import {getRandomItems, getImageUrl} from '@/libs/tmdb';
import {ArrowRightOutlined} from '@ant-design/icons';
import logo from '@/assets/logo.svg';

const {Title, Paragraph} = Typography;
const {useBreakpoint} = Grid;
const contentStyle: React.CSSProperties = {
  height: '100vh',
  color: '#fff',
  background: '#222222',
  position: 'relative',
};

const Home: React.FC = () => {
  const {data: movie, isSuccess: isMoviesSuccess} = useDiscoverMovie({}, true);
  const {data: config} = useConfiguration();
  const screens = useBreakpoint();

  return (
    <> 
      <Flex
        vertical
        gap={40}
        align="center"
        style={{
          position: 'fixed',
          top: '45%',
          width: '100%',
          zIndex: 2,
        }}
      >
        <Flex
          align="center"
          gap={10}
        >
          <img
            src={logo}
            width="32"
          />
          <Title
            className="text-white"
            style={{color: 'white', margin: '0px 10px 0 10px'}}
          >
            Movify
          </Title>
        </Flex>
        <Link to="/movie/explore">
          <Button
            size="large"
            icon={<ArrowRightOutlined />}
            color="danger"
            variant="filled"
            shape="round"
          >
            Explore
          </Button>
        </Link>
      </Flex>
      <Carousel autoplay>
        {
          isMoviesSuccess ? 
            getRandomItems(movie.pages[0].results, 5).map((item, idx) => (
              <div key={idx}>
                <div style={contentStyle}>
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 80%)',
                    }}
                  />
                  <Flex
                    vertical
                    gap={20}
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      left: '10%',
                      zIndex: 2,
                      width: '80%',
                      textAlign: 'left',
                    }}
                  >
                    <Title
                      level={3}
                      ellipsis={!screens.md}
                      style={{color: 'white'}}
                    >
                      {item.title}
                    </Title>
                    <Paragraph
                      style={{color: 'grey'}}
                      ellipsis={!screens.md}
                    >
                      {item.overview}
                    </Paragraph>
                  </Flex>
                  {
                    config && (
                      <img
                        alt={item.title}
                        src={getImageUrl(config.images.base_url, 'original', item.backdrop_path as string)}
                        height="100%"
                        width="100%"
                        style={{objectFit: 'cover'}}
                      />
                    )
                  }
                </div>
              </div>
            )) :
            (
              <div>
                <div style={contentStyle} />
              </div>
            )
        }
      </Carousel>
    </>
  );
};

export default Home;