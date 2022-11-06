/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import {
  NativeStackScreenProps
} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams < RootTabParamList > | undefined;
  SignIn: NavigatorScreenParams < RootTabParamList > | undefined;
  Welcome: NavigatorScreenParams < RootTabParamList > | undefined;
  Config: NavigatorScreenParams < RootTabParamList > | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps < Screen extends keyof RootStackParamList > = NativeStackScreenProps <
  RootStackParamList,
  Screen > ;

export type RootTabParamList = {
  Home: undefined;
};

export type RootTabScreenProps < Screen extends keyof RootTabParamList > = CompositeScreenProps <
  BottomTabScreenProps < RootTabParamList, Screen > ,
  NativeStackScreenProps < RootStackParamList >
  >
;


export type UserValueCredentials = {
  aud: string
  auth_time: 1667765431
  email: string
  email_verified: boolean
  exp: number
  iat: number
  name: string
  picture: string
  sub: string
  user_id: string
}