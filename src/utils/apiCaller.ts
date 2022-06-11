import axios from 'axios';

const { REACT_APP_BE_PROTOCOL, REACT_APP_BE_DOMAIN, REACT_APP_BE_PORT, REACT_APP_BE_PREFIX } = process.env;

const beFullDomain = `${REACT_APP_BE_PROTOCOL}://${REACT_APP_BE_DOMAIN}${
  REACT_APP_BE_PORT ? ':' + REACT_APP_BE_PORT : ''
}${REACT_APP_BE_PREFIX}`;

const apiCaller = axios.create({
  baseURL: beFullDomain,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const tokenItemName = process.env.REACT_APP_TOKEN_ITEM_NAME ?? 'access_token';
const refreshTokenItemName = process.env.REACT_APP_REFRESH_TOKEN_ITEM_NAME ?? 'refresh_token';

const redirectToLoginPage = () => {
  sessionStorage.removeItem(tokenItemName);
  sessionStorage.removeItem(refreshTokenItemName);
  window.location.replace('/login');
};

const getNewToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem(refreshTokenItemName);
    const res = await axios(`${beFullDomain}/users/refreshToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { refresh_token: refreshToken },
    });

    const { status: success, access_token, refresh_token } = res.data;

    if (success) {
      sessionStorage.setItem(tokenItemName, access_token ?? '');
      sessionStorage.setItem(refreshTokenItemName, refresh_token ?? '');

      return access_token;
    } else {
      redirectToLoginPage();
    }
  } catch (err) {
    throw new Error('Refresh the token failed!');
  }
};

apiCaller.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    const isAuthenticated = !!config.headers.Authorization;

    if (isAuthenticated) {
      switch (status) {
        case 401: {
          const refreshToken = sessionStorage.getItem(refreshTokenItemName);
          if (refreshToken) {
            try {
              const newToken = await getNewToken();

              config.headers['Authorization'] = `Bearer ${newToken}`;
              return apiCaller(config);
            } catch (err) {
              redirectToLoginPage();
            }
          } else {
            redirectToLoginPage();
          }
        }
      }
    }

    throw new Error(data.msg);
  },
);

export default apiCaller;
