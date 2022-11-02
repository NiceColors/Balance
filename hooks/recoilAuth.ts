import { OAuthCredential } from 'firebase/auth';
import {atom} from 'recoil'

const recoilAuth = atom({
    key: 'recoilAuth', // unique ID (with respect to other atoms/selectors)
    default: {} as OAuthCredential, // default value (aka initial value)
  });

  export {recoilAuth}