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
import FirstAccess from '../screens/FirstAccess';
import { firstAccessRecoilHook } from '../hooks/recoilFirstAccess';
import { child, get, ref } from 'firebase/database';
import { appDB } from '../config/firebaseConfig';

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
  const [firstAccess, setFirstAccess] = useRecoilState(firstAccessRecoilHook)

  const getData = async () => {
    setLogged(false)
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

       const user: TUserToken = jwt(value)


       get(child(ref(appDB), `users/${user.sub}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setFirstAccess(snapshot.val().firstAccess)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

       if (auth.success === true) {
          setToken(user)
          setLogged(true)
       }
      }
      return
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
  },[firstAccess])
  
  
  
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
       {firstAccess === true ? (
          <Stack.Screen name="Welcome" component={FirstAccess} options={{ headerShown: false }} />
       ) : (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
       )}
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
