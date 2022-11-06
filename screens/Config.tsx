import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { Button } from '../components/Button';
import { Content } from '../components/Container';

import { Text, View } from '../components/Themed';
import useLogout from '../hooks/useLogout';
import { recoilAuth } from '../recoil/recoilAuth';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'Config'>) {
const {logOut} = useLogout()


  return (
    <Content>
      <View style={{marginTop: 200}}>
         <Button onPress={() => {logOut()}}>
          <Text>
          Sair

          </Text>
        </Button>
    </View>
    </Content>
  );
}

