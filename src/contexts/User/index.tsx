import { ReactNode, createContext, useState } from 'react';
import { notification } from 'antd';

import IPagination from 'constants/Pagination';
import apiCaller from 'utils/apiCaller';

const endpoint = '/user';
const tokenItemName = process.env.REACT_APP_TOKEN_ITEM_NAME ?? 'access_token';

type StateType = {
  state: {
    data: IUser[];
    page: number;
    total: number;
  };
  getUserLogin: Function;
};

const initialState: StateType = {
  state: {
    data: [],
    page: 1,
    total: 0,
  },
  getUserLogin: () => {},
};

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  dob: Date;
  website: string;
}

export const UserContext = createContext(initialState);

export interface IUserResponse {
  status: boolean;
  message?: string;
  data?: IUser[] | IUser;
  total?: number;
}

interface IQuery extends Partial<IUser>, IPagination {}

export const UserProvider = (props: { children?: ReactNode }) => {
  const [data, setData] = useState<IUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const accessToken = sessionStorage.getItem(tokenItemName);

  const getUserLogin = async (payload: IQuery): Promise<void> => {
    try {
      const response = await apiCaller(`${endpoint}/login`, {
        method: 'GET',
        params: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data, total, status, message }: IUserResponse = await response.data;
      // const { data, total, status, message }: IUserResponse = mockData;

      if (status) {
        if (data && data.constructor === Array) {
          setData(data);
        }
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Get list of Users',
        description: err.message ?? err,
      });
    }
  };

  const create = async (payload: IUser) => {
    try {
      const response = await apiCaller(endpoint, {
        method: 'POST',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, message } = await response.data;

      if (status) {
        notification.success({
          message: 'Create a user',
          description: message ?? 'Successfully!',
        });
        getUserLogin({ page });
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Create a user',
        description: err.message ?? err,
      });
    }
  };

  const update = async (guid: string, payload: IUser) => {
    try {
      const response = await apiCaller(`${endpoint}/${guid}`, {
        method: 'PUT',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, message } = await response.data;

      if (status) {
        notification.success({
          message: 'Update a user',
          description: message ?? 'Successfully!',
        });
        get({ page });
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Update a user',
        description: err.message ?? err,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        state: {
          data,
          page,
          total,
        },
        getUserLogin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
