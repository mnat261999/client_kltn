import { ReactNode, useContext, useState } from 'react';
import { Menu, Button, Avatar, Space, Badge, MenuProps, Dropdown, Drawer, Form, Row, Col } from 'antd';

import { Link, useHistory, useLocation } from 'react-router-dom';

import navigators, { NavigationType } from 'routes/navigators';
import { AuthContext } from 'contexts/Auth';
import {
  BellOutlined,
  CaretDownOutlined,
  FormOutlined,
  LogoutOutlined,
  MessageOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { IconButtonConfig, ProfileButtonConfig } from './constants';
import EditProfile from 'components/EditProfile';

export default function MainLayout() {
  const location = useLocation();
  const history = useHistory();

  const [isEditProfile, setIsEditProfile] = useState(false);

  const authContext = useContext(AuthContext);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.');
    switch (e.key) {
      case 'profile': {
        history.push('/profile');
        break;
      }
      case 'edit-profile': {
        setIsEditProfile(true);
        break;
      }
      case 'settings': {
        history.push('/settings');
        break;
      }
      case 'logout': {
        authContext.logout();
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
            label: 'Edit Profile',
            key: 'edit-profile',
            icon: <FormOutlined />,
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
      <EditProfile visible={isEditProfile} onClose={() => setIsEditProfile(false)} />
    </Space>
  );
}
