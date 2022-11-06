import { View, Image, StyleSheet, StatusBar } from 'react-native'
import Logo from '../assets/images/splash.png'
import { Button } from '../components/Button';
import { Text } from '../components/Themed';
import useAuth from '../hooks/useAuth';


export default function Login() {
  const {request, promptAsync} = useAuth()


  return (
    <View style={styles.container }>
      <Image source={Logo} style={styles.tinyLogo}/>
      <Button 
      android_ripple={{
        color: '#ffffff68',
        borderless: false,
        radius: 50,
      }} 
      style={styles.loginButton} 
      disabled={!request}
      onPress={ () => {
        promptAsync();
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
