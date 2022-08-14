import {Middleware} from "../features/middlewares";
import {Login} from "../features/auth/login";

export const AppPage = {
  Middleware: {
    key: 'Middleware',
    component: Middleware,
  },
  Login: {
    key: 'Login',
    component: Login,
  },
}