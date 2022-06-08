import { ColumnsType } from 'antd/lib/table';

import { IUser } from 'contexts/User';

const userColumns: ColumnsType<IUser> = [
  {
    title: 'GUID',
    dataIndex: 'guid',
    key: 'guid',
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'first_Name',
    key: 'first_Name',
  },
  {
    title: 'LAST NAME',
    dataIndex: 'last_Name',
    key: 'last_Name',
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'MOBILE NUMBER',
    dataIndex: 'mobile_Number',
    key: 'mobile_Number',
  },
  {
    title: 'ADDRESS',
    dataIndex: 'address',
    key: 'address',
  },
];

export default userColumns;
