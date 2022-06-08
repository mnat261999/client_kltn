import React from 'react';

import { UserProvider } from 'contexts/User';
import { ReportProvider } from 'contexts/Report';

import MainLayout from 'layouts/Main';

import NewsFeed from 'pages/NewsFeed';
import MyProfile from 'pages/MyProfile';

export type NavigationType = {
  title: string;
  path: string;
  page: JSX.Element;
  exact?: boolean | undefined;
  providers?: React.ReactType[];
  hideInMenu?: boolean;
};

export interface INavigator extends NavigationType {
  layout: any;
}

const navigators: INavigator[] = [
  {
    path: '/',
    title: 'News Feed',
    page: <NewsFeed />,
    providers: [],
    exact: true,
    hideInMenu: true,
    layout: (props: any) => <MainLayout {...props}/>,
  },
  {
    path: '/profile',
    title: 'My Profile',
    page: <MyProfile />,
    providers: [],
    exact: true,
    hideInMenu: true,
    layout: (props: any) => <MainLayout {...props}/>,
  },
];

export default navigators;
