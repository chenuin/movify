import type {MenuProps} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {Flex, Button, Space, Dropdown} from 'antd';
import {PushpinOutlined, UserOutlined} from '@ant-design/icons';
import logo from '@/assets/logo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const gotoExplore = () => {
    navigate('/movie/explore');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/movie/watch-list'>
          <PushpinOutlined /> Watch List
        </Link>
      ),
    },
  ];

  return (
    <>
      <Link to="/">
        <Flex>
          <img
            src={logo}
            width="32"
          />
          <h1 style={{margin: '0px 10px 0 10px'}}>
            Movify
          </h1>
        </Flex>
      </Link>
      <Space size="large">
        <Button
          color="primary"
          type="link"
          size="large"
          onClick={gotoExplore}
        >
          Explore
        </Button>
        <Dropdown menu={{items}}>
          <Button
            icon={<UserOutlined />}
            shape="circle"
          />
        </Dropdown>
      </Space>
    </>
  );
};

export default Header;
