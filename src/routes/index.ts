import { lazy, FC } from "react";
import HomePage from "@/pages/homePage/HomePage";

const AdPage = lazy(() => import("@/pages/adPage/AdPage"));
const CreateAdPage = lazy(() => import("@/pages/createAdPage/CreateAdPage"));
const EditAdPage = lazy(() => import("@/pages/editAdPage/EditAdPage"));
const LoginPage = lazy(() => import("@/pages/loginPage/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/registerPage/RegisterPage"));
const UserProfilePage = lazy(
  () => import("@/pages/userProfilePage/UserProfilePage")
);
const EditUserProfilePage = lazy(
  () => import("@/pages/editUserProfilePage/EditUserProfilePage")
);
const NotFoundPage = lazy(() => import("@/pages/notFoundPage/NotFoundPage"));

interface Route {
  path: string;
  element: FC;
  children?: Route[];
}

const routes: Route[] = [
  {
    path: "/ad/:slug",
    element: AdPage,
  },
  {
    path: "/ad/create",
    element: CreateAdPage,
  },
  {
    path: "/ad/:slug/edit",
    element: EditAdPage,
  },
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/register",
    element: RegisterPage,
  },
  {
    path: "/user/:slug",
    element: UserProfilePage,
  },
  {
    path: "/user/:slug/edit",
    element: EditUserProfilePage,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];

export default routes;

// <Route path="/ad/:slug" element={<AdPage />} />
// <Route path="/ad/create" element={<CreateAdPage />} />
// <Route path="/ad/:slug/edit" element={<EditAdPage />} />
// <Route path="/" element={<HomePage />} />
// <Route path="/login" element={<LoginPage />} />
// <Route path="/register" element={<RegisterPage />} />
// <Route path="/user/:slug" element={<UserProfilePage />} />
// <Route path="/user/:slug/edit" element={<EditUserProfilePage />} />
