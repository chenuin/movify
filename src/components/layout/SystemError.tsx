import {Flex, Result} from 'antd';

const SystemError: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{minHeight: 'calc(100vh - 165px)'}}
    >
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    </Flex>
  );
};

export default SystemError;
