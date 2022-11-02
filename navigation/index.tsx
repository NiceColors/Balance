import * as React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import Home from '../screens/Home';
import { RootStackParamList, RootTabParamList, TUserToken } from '../types';
import Login from '../screens/Login';
import { useRecoilState, useRecoilValue } from 'recoil'
import { recoilAuth } from '../hooks/recoilAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import jwt from 'jwt-decode'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  const [logged, setLogged] = React.useState(false)
  const [token, setToken] = useRecoilState(recoilAuth)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        if (await LocalAuthentication.getEnrolledLevelAsync() !== 2) {
          return
        }
        if (await LocalAuthentication.isEnrolledAsync() !== true) {
          return
        }
       const auth =  await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancelar",
        disableDeviceFallback: true,
        promptMessage: "Use a digital para continuar"
       })

       if (auth.success === true) {
          const user: TUserToken = jwt(value)
          setToken(user)
          setLogged(true)
       }
      }
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    if (!token.name) {
      getData()
    }
  },[])
  
  React.useEffect(() => {
    if (token.name) {
      setLogged(true)
    }
  },[token])
  
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false
      }}
    >
      {!logged ? (
        <Stack.Screen name="SignIn" component={Login} options={{ headerShown: false }} />
      ) : (
      <>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </>
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}>
      <>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      
      </>
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
