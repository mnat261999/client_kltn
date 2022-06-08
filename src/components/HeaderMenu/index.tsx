import { ReactNode, useContext } from 'react';
import { Menu, Button, Avatar, Space, Badge, MenuProps, Dropdown } from 'antd';

import { Link, useHistory, useLocation } from 'react-router-dom';

import navigators, { NavigationType } from 'routes/navigators';
import { AuthContext } from 'contexts/Auth';
import {
  BellOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  MessageOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { IconButtonConfig, ProfileButtonConfig } from './constants';

export default function MainLayout() {
  const location = useLocation();
  const history = useHistory();

  const authContext = useContext(AuthContext);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e);
    switch (e.key) {
      case 'profile': {
        history.push('/profile');
        break;
      }
      case 'settings': {
        history.push('/settings');
        break;
      }
      case 'logout': {
        history.push('/logout');
        break;
      }
      default:
        break;
    }
  };

  const menu = (
    <div style={{ backgroundColor: 'white' }}>
      <Menu
        onClick={handleMenuClick}
        items={[
          {
            label: 'My Profile',
            key: 'profile',
            icon: <ProfileOutlined />,
          },
          {
            label: 'Settings',
            key: 'settings',
            icon: <SettingOutlined />,
          },
          {
            type: 'divider',
          },
          {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
          },
        ]}
      />
    </div>
  );

  return (
    <Space>
      <Button
        {...IconButtonConfig}
        icon={
          <Badge overflowCount={9} count={222} size="small">
            <UserAddOutlined />
          </Badge>
        }
      />
      <Button
        {...IconButtonConfig}
        icon={
          <Badge overflowCount={9} count={5} size="small">
            <BellOutlined />
          </Badge>
        }
      />
      <Button
        {...IconButtonConfig}
        icon={
          <Badge overflowCount={9} count={5} size="small">
            <MessageOutlined />
          </Badge>
        }
      />
      <Dropdown overlay={menu} placement="bottom">
        <Button {...ProfileButtonConfig} style={{ padding: '0 4px' }}>
          <Space>
            <Avatar src={'https://i.pravatar.cc/300'} />
            Lucy
            <CaretDownOutlined style={{ fontSize: '10px' }} />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
}
