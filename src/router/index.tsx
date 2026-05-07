import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import {
  AboutRoute,
  ArchiveRoute,
  ArticleRoute,
  CategoryRoute,
  EchartsDoubleRoute,
  EchartsRoute,
  EssaysRoute,
  HomeRoute,
  MeRoute,
  SearchRoute,
  FriendRoute,
} from "./RouteElements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "me",
        element: <MeRoute />,
      },
      {
        path: "archive",
        element: <ArchiveRoute />,
      },
      {
        path: "about",
        element: <AboutRoute />,
      },
      {
        path: "category/:slug",
        element: <CategoryRoute />,
      },
      {
        path: "search",
        element: <SearchRoute />,
      },
      {
        path: "essay",
        element: <EssaysRoute />,
      },
      {
        path: "article/:id",
        element: <ArticleRoute />,
      },
      {
        path: "echarts",
        element: <EchartsRoute />,
      },
      {
        path: "echartdoube",
        element: <EchartsDoubleRoute />,
      },
      {
        path: "friends",
        element: <FriendRoute></FriendRoute>,
      },
    ],
  },
]);
