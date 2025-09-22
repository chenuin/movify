import {createHashRouter} from 'react-router-dom';
import Home from '@/pages/Home';
import Main from '@/components/layout/Main';
import Explore from '@/pages/movie/Explore';
import WatchList from '@/pages/movie/WatchList';
import Detail from '@/pages/movie/Detail';
import ErrorPage from '@/pages/ErrorPage';

export const router = createHashRouter([
  {
    path: '/',
    Component: Home,
    ErrorBoundary: ErrorPage,
  },
  {
    path: '/movie',
    Component: Main,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: 'explore',
        Component: Explore,
      },
      {
        path: 'watch-list',
        Component: WatchList,
      },
      {
        path: 'detail/:id',
        Component: Detail,
      },
    ],
  },
]);
