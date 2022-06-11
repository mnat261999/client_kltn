import { ReactNode, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';

import apiCaller from 'utils/apiCaller';

const endpoint = '/user';
const tokenItemName = process.env.REACT_APP_TOKEN_ITEM_NAME ?? 'access_token';
const refreshTokenItemName = process.env.REACT_APP_REFRESH_TOKEN_ITEM_NAME ?? 'refresh_token';

type StateType = {
  state: {
    // accessToken?: string;
    // username?: string;
  };
  login: Function;
  logout: Function;
  // refresh: Function;
  changePassword: Function;
};

const initialState: StateType = {
  state: {
    // accessToken: '',
    // username: '',
  },
  login: () => {},
  logout: () => {},
  // refresh: () => {},
  changePassword: () => {},
};

export interface ILoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface IChangePassword {
  password: string;
  new_password: string;
  confirm_password: string;
}

export interface IAuthResponse {
  success: boolean;
  msg: string;
  access_token?: string;
}

export const AuthContext = createContext(initialState);

export const AuthProvider = (props: { children?: ReactNode }) => {
  const history = useHistory();
  const accessToken = sessionStorage.getItem(tokenItemName);

  const login = async (payload: ILoginPayload): Promise<void> => {
    try {
      const { remember, ...user } = payload;

      const response = await apiCaller(`${endpoint}/login`, {
        method: 'POST',
        data: user,
      });
      
      const { msg, success, access_token }: IAuthResponse = await response.data;

      if (success) {
        if (remember) localStorage.setItem('email', user.email);
        sessionStorage.setItem(tokenItemName, access_token ?? '');
        history.push('/');
      } else {
        notification.error({
          message: 'Login failed',
          description: msg,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Login failed',
        description: err.msg ?? "Login failed, please try again!",
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem(tokenItemName);
    sessionStorage.removeItem(refreshTokenItemName);
    history.push('/login');
  };

  // const refresh = async (): Promise<void> => {
  //   try {
  //     const response = await apiCaller(`${endpoint}/refresh`, {
  //       method: 'POST',
  //       data: {
  //         refresh_token: sessionStorage.getItem(refreshTokenItemName),
  //       },
  //     });

  //     const { success, msg, access_token, refresh_token }: IAuthResponse = await response.data;

  //     if (success) {
  //       sessionStorage.setItem(tokenItemName, access_token ?? '');
  //       sessionStorage.setItem(refreshTokenItemName, refresh_token ?? '');

  //       history.push('/');
  //     } else {
  //       throw new Error(msg);
  //     }
  //     //eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     notification.error({
  //       message: 'Login',
  //       description: err.message ?? err,
  //     });
  //   }
  // };

  const changePassword = async (payload: IChangePassword): Promise<void> => {
    try {
      const response = await apiCaller('/user/change-password', {
        method: 'PUT',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { access_token, success, msg }: IAuthResponse = await response.data;

      if (success) {
        history.push('/');
      } else {
        throw new Error(msg);
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
        // refresh,
        changePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
