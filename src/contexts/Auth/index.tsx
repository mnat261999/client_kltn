import { ReactNode, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';

import apiCaller from 'utils/apiCaller';

const endpoint = '/auth';
const tokenItemName = process.env.REACT_APP_TOKEN_ITEM_NAME ?? 'access_token';
const refreshTokenItemName = process.env.REACT_APP_REFRESH_TOKEN_ITEM_NAME ?? 'refresh_token';

type StateType = {
  state: {
    // accessToken?: string;
    // username?: string;
  };
  login: Function;
  logout: Function;
  refresh: Function;
  changePassword: Function;
};

const initialState: StateType = {
  state: {
    // accessToken: '',
    // username: '',
  },
  login: () => {},
  logout: () => {},
  refresh: () => {},
  changePassword: () => {},
};

export interface ILoginPayload {
  username: string;
  password: string;
  remember: boolean;
}

export interface IChangePassword {
  password: string;
  new_password: string;
  confirm_password: string;
}

export interface IAuthResponse {
  status: boolean;
  message?: string;
  access_token?: string;
  refresh_token?: string;
  is_first_login?: string;
}

export const AuthContext = createContext(initialState);

export const AuthProvider = (props: { children?: ReactNode }) => {
  const history = useHistory();
  const accessToken = sessionStorage.getItem(tokenItemName);

  const login = async (payload: ILoginPayload): Promise<void> => {
    try {
      // const { 
      //   remember, 
      //   ...user
      // } = payload;
      history.push('/');

      // const response = await apiCaller(`${endpoint}/login`, {
      //   method: 'POST',
      //   data: user,
      // });

      // const {
      //   status,
      //   message,
      //   access_token,
      //   refresh_token,
      //   is_first_login,
      // }: IAuthResponse = await response.data;

      // if (status) {
      //   if (remember) localStorage.setItem('username', user.username);
      //   sessionStorage.setItem(tokenItemName, access_token ?? '');
      //   sessionStorage.setItem(refreshTokenItemName, refresh_token ?? '');

      //   if (is_first_login) history.push('/set-password');
      //   else history.push('/');
      // } else {
      //   throw new Error(message);
      // }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Login',
        description: err.message ?? err,
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem(tokenItemName);
    sessionStorage.removeItem(refreshTokenItemName);
    history.push('/login');
  };

  const refresh = async (): Promise<void> => {
    try {
      const response = await apiCaller(`${endpoint}/refresh`, {
        method: 'POST',
        data: {
          refresh_token: sessionStorage.getItem(refreshTokenItemName),
        },
      });

      const { status, message, access_token, refresh_token }: IAuthResponse = await response.data;

      if (status) {
        sessionStorage.setItem(tokenItemName, access_token ?? '');
        sessionStorage.setItem(refreshTokenItemName, refresh_token ?? '');

        history.push('/');
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Login',
        description: err.message ?? err,
      });
    }
  };

  const changePassword = async (payload: IChangePassword): Promise<void> => {
    try {
      const response = await apiCaller('/user/change-password', {
        method: 'PUT',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, message }: IAuthResponse = await response.data;

      if (status) {
        history.push('/');
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Login',
        description: err.message ?? err,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state: {
          // accessToken,
          // username,
        },
        login,
        logout,
        refresh,
        changePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
