import {atom} from 'recoil'
import { UserValueCredentials } from '../types';

const recoilAuth = atom({
    key: 'recoilAuth', // unique ID (with respect to other atoms/selectors)
    default: null as UserValueCredentials | null, // default value (aka initial value)
  });

  export {recoilAuth}