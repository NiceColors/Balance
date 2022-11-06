import {atom} from 'recoil'


const firstAccessRecoilHook = atom({
    key: 'firstAccessRecoilHook', // unique ID (with respect to other atoms/selectors)
    default: undefined as boolean | undefined, // default value (aka initial value)
  });

  export {firstAccessRecoilHook}