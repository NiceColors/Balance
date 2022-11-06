import * as React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import Config from '../screens/Config';
import Home from '../screens/Home';
import { RootStackParamList, RootTabParamList } from '../types';
import Login from '../screens/Login';
import { useRecoilValue } from 'recoil'
import { recoilAuth } from '../recoil/recoilAuth';
import getSavedJWT from '../helpers/getSavedToken';

export default  function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

 function RootNavigator() {
  const user = useRecoilValue(recoilAuth)
  const [logged, setLogged] = React.useState(false)
 
  async function checkLogged() {
      if (user) {
      setLogged(true)
      return
      }

      const token = await getSavedJWT()
      if (token) {
        setLogged(true)
        return
      }

      setLogged(false)
  }

  React.useEffect(() => {
    checkLogged()
  },[user])
  
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: 'slide_from_left'
      }}
    >
      {logged === false ? (
        <Stack.Screen name="SignIn" component={Login} options={{ headerShown: false,
         animationTypeForReplace: 'push',
        }} />
      ): 
         ( <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false,
      }} />
          <Stack.Screen name="Config" component={Config} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          </>)
      }
        
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
