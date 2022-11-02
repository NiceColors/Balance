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
import { RootStackParamList, RootTabParamList } from '../types';
import Login from '../screens/Login';
import { useRecoilValue } from 'recoil'
import { recoilAuth } from '../hooks/recoilAuth';
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
  const token = useRecoilValue(recoilAuth)
  
  React.useEffect(() => {
    if (token.idToken) {
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
