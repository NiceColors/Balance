import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { Button } from '../components/Button';
import { Content } from '../components/Container';

import { Text, View } from '../components/Themed';
import { recoilAuth } from '../hooks/recoilAuth';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'Config'>) {
  const [token, setToken] = useRecoilState(recoilAuth)


  const loggoff = async () => {
    await AsyncStorage.clear()
    setToken(null)
  }
  return (
    <Content>
      <View style={{marginTop: 200}}>
         <Button onPress={() => {loggoff()}}>
          <Text>
          Sair

          </Text>
        </Button>
    </View>
    </Content>
  );
}

