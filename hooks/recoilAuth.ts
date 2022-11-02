import {atom} from 'recoil'
import { TUserToken } from '../types';

const recoilAuth = atom({
    key: 'recoilAuth', // unique ID (with respect to other atoms/selectors)
    default: {} as TUserToken, // default value (aka initial value)
  });

  export {recoilAuth}