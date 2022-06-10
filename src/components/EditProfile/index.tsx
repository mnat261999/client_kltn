import { Button, Col, DatePicker, Drawer, DrawerProps, Form, Input, Row, Select, Space, Tabs } from 'antd';
import ChangePasswordForm from 'components/ChangePasswordForm';
import EditProfileForm from 'components/EditProfileForm';

const EditProfile = (props: DrawerProps) => {

  return (
    <Drawer {...props} width={700} bodyStyle={{ padding: '20px 50px' }}>
      <Tabs defaultActiveKey='profile'>
        <Tabs.TabPane key='profile' tab="Profile">
          <EditProfileForm />
        </Tabs.TabPane>
        <Tabs.TabPane key='changePassword' tab="Change password">
          <ChangePasswordForm />
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
};

export default EditProfile;
