import {Middleware} from "../features/middlewares";
import {Login} from "../features/auth/login";
import {Job} from "../features/jobs";

export const AppPage = {
  Middleware: {
    key: 'Middleware',
    component: Middleware,
  },
  Login: {
    key: 'Login',
    component: Login,
  },
  Job: {
    key: 'Job',
    component: Job,
  },
}