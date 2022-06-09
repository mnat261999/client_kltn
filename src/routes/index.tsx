import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import navigators, { INavigator, NavigationType } from './navigators';

import LoginPage from 'pages/Login';
import SetPasswordPage from 'pages/SetPassword';
import ExceptionPage from 'pages/Exception';

import { AuthProvider } from 'contexts/Auth';
import SignUpPage from 'pages/SignUp';

const ContextRoute = ({ providers, ...nav }: NavigationType) => {
  let context = nav.page;

  if (providers?.length) {
    providers?.forEach((Provider: React.ReactType) => {
      context = <Provider>{context}</Provider>;
    });
  }

  return (
    <Route key={`Routes.${nav.path}`} path={nav.path} exact={nav.exact}>
      {context}
    </Route>
  );
};

const MainLayoutRoute = (props: INavigator) => {
  const { layout: Layout, ...rest } = props;

  return (
    <AuthProvider>
      <Layout>
        <ContextRoute {...rest} key={`ContextRoute.${props.path}`} />
      </Layout>
    </AuthProvider>
  );
};

export default function Routes() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        {navigators.map((nav: INavigator) => {
          return <MainLayoutRoute {...nav} key={`ContextRoute.${nav.path}`} />;
        })}
        <Route key={'Routes.Login'} path={'/login'}>
          <ContextRoute
            title="Login"
            path="/login"
            page={<LoginPage />}
            exact={true}
            providers={[AuthProvider]}
            key={'ContextRoute.Login'}
          />
        </Route>
        <Route key={'Routes.SignUp'} path={'/sign-up'}>
          <ContextRoute
            title="Sign Up"
            path="/sign-up"
            page={<SignUpPage />}
            exact={true}
            providers={[AuthProvider]}
            key={'ContextRoute.SignUp'}
          />
        </Route>
        <Route key={'Routes.SetPassword'} path={'/set-password'}>
          <ContextRoute
            title="Set password"
            path="/set-password"
            page={<SetPasswordPage />}
            exact={true}
            providers={[AuthProvider]}
            key={'ContextRoute.SetPassword'}
          />
        </Route>
        <Route key={'Routes.Exception'} path={'*'}>
          <ExceptionPage />
        </Route>
      </Switch>
    </Router>
  );
}
