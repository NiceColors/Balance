import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import { UserValueCredentials } from '../types';
import { appAuth } from '../config/firebaseConfig';
import { useRecoilState } from 'recoil';
import { recoilAuth } from '../recoil/recoilAuth';
import jwtDecode from 'jwt-decode';

function useLogin() {
    const [user, setUser] = useRecoilState(recoilAuth)
    const [token, setToken] = useState(null)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '236524620652-84ckk127e90n1lleeabdct9faaibe5kl.apps.googleusercontent.com',
        },
      );

      React.useEffect( () => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          login(id_token)
        }
      },[response])
    


      const storeData = async (value: UserCredential) => {
        const user = value.user as any
        try {
          if(user) {
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(user.accessToken))
            setToken(jwtDecode(user.accessToken))
            setUser(jwtDecode(user.accessToken))
          }
          
        } catch (e) {
          // saving error
        }
      }
      
      async function login(token: string) {
        const credential = GoogleAuthProvider.credential(token)
        const user = await signInWithCredential(appAuth, credential);
        storeData(user)
      }


        
      return {request, response, promptAsync, token}
}


export default useLogin