import jwtDecode from 'jwt-decode';
import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useSetRecoilState } from 'recoil';
import { Button } from '../components/Button';
import { Text } from '../components/Themed';
import getSavedJWT from '../helpers/getSavedToken';
import { recoilAuth } from '../recoil/recoilAuth';
import useLogin from '../hooks/useLogin';
import { RootStackScreenProps } from '../types';


export default function Login({ navigation }: RootStackScreenProps<'SignIn'>) {
  const setToken = useSetRecoilState(recoilAuth)
  const { promptAsync, token } = useLogin()

  const handleLogin = async () => {
    const savedJWT =  await getSavedJWT()
    if (savedJWT ) {
      console.log(jwtDecode(savedJWT));
      setToken(jwtDecode(savedJWT))
    }
  }

  React.useEffect(() => {
    handleLogin()
  },[token])


  return (
    <View style={styles.container }>
      <Button 
      android_ripple={{
        color: '#ffffff68',
        borderless: false,
        radius: 50,
      }} 
      style={styles.loginButton} 
      onPress={ () => {
        promptAsync()
}}>
        <Text>Login with Google</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  tinyLogo: {
    height: 100,
    alignSelf: 'center',
  },
  loginButton: {
    marginTop: 25
  }
});
