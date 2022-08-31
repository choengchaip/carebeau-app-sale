import {Middleware} from "../features/middlewares";
import {Login} from "../features/auth/login";
import {Job} from "../features/jobs";
import {JobSingle} from "../features/job_single";
import { JobSingleCheckIn } from '../features/job_single/check_in'
import {JobSingleStoreImage} from "../features/job_single/store_image";
import {JobSingleDocument} from "../features/job_single/document";

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
  JobSingleStoreImage: {
    key: 'JobSingleStoreImage',
    component: JobSingleStoreImage,
  },
  JobSingleDocument: {
    key: 'JobSingleDocument',
    component: JobSingleDocument,
  },
}
