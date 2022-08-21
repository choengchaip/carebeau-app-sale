import {Middleware} from "../features/middlewares";
import {Login} from "../features/auth/login";
import {Job} from "../features/jobs";
import {JobSingle} from "../features/job_single";
import { JobSingleCheckIn } from '../features/job_single/pages/JobSingleCheckIn'

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
  JobSingle: {
    key: 'JobSingle',
    component: JobSingle,
  },
  JobSingleCheckIn: {
    key: 'JobSingleCheckIn',
    component: JobSingleCheckIn,
  },
}
