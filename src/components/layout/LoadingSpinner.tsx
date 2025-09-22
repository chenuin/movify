import {Flex, Spin} from 'antd';

const LoadingSpinner: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{minHeight: 'calc(100vh - 165px)'}}
    >
      <Spin size="large" />
    </Flex>
  );
};

export default LoadingSpinner;
