import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout.jsx";
import RecipePreviewList from "./pages/recipes/RecipePreviewList.jsx";
import NotFound from "./components/NotFound.jsx";
import Root from "./pages/Root.jsx";
import AddOrEditRecipe from "./pages/recipes/AddOrEditRecipe.jsx";
import FullRecipeView from "./pages/recipes/FullRecipeView.jsx";
import AddOrEditIngredients from "./pages/ingredients/AddOrEditIngredients.jsx";
import UserLikedRecipes from "./pages/users/UserLikedRecipes.jsx";
import { AuthProvider } from "./contexts/Auth.context";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recipes",
        children: [
          {
            index: true,
            element: <RecipePreviewList />,
          },
          {
            path: ":id",
            element: <FullRecipeView />,
          },
          {
            element: <PrivateRoute />,
            children: [
              {
                path: "users/:id",
                element: <UserLikedRecipes />,
              },
              {
                path: "add",
                children: [
                  {
                    index: true,
                    element: <AddOrEditRecipe />,
                  },
                  {
                    path: "ingredients",
                    element: <AddOrEditIngredients />,
                  },
                ],
              },
              {
                path: "edit/:id",
                children: [
                  {
                    index: true,
                    element: <AddOrEditRecipe />,
                  },
                  {
                    path: "ingredients",
                    element: <AddOrEditIngredients />,
                  },
                ],
              },
            ],
          },
          {
            path: "add",
            children: [
              {
                index: true,
                element: <AddOrEditRecipe />,
              },
              {
                path: "ingredients",
                element: <AddOrEditIngredients />,
              },
            ],
          },
          {
            path: "edit/:id",
            children: [
              {
                index: true,
                element: <AddOrEditRecipe />,
              },
              {
                path: "ingredients",
                element: <AddOrEditIngredients />,
              },
            ],
          },
          {
            path: ":id",
            element: <FullRecipeView />,
          },
          {
            path: "users/:id",
            element: <UserLikedRecipes />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
);
