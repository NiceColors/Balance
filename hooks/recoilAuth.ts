import {atom} from 'recoil'
import { TUserToken } from '../types';

const recoilAuth = atom({
    key: 'recoilAuth', // unique ID (with respect to other atoms/selectors)
    default: null as TUserToken | null, // default value (aka initial value)
  });

  export {recoilAuth}