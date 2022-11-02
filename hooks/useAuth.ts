import { useEffect } from 'react';
import { GoogleAuthProvider, OAuthCredential, signInWithCredential } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import { appAuth } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil'
import { recoilAuth } from './recoilAuth';

function useAuth() {
    const [token, setToken] = useRecoilState(recoilAuth)

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '584558764987-dqvmsacv8sm5sf2rdcn6mhufgtmfg6o3.apps.googleusercontent.com',
        },
      );

      const storeData = async (value: OAuthCredential) => {
        try {
          await AsyncStorage.setItem('@storage_Key', JSON.stringify(value))
          setToken(value)
        } catch (e) {
          // saving error
        }
      }

    
      useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token)
          signInWithCredential(appAuth, credential);
          storeData(credential)
        }
        
      }, [response]);
      
  return {request, token, promptAsync}
}

export default useAuth