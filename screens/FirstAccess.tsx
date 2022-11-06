import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import {  PageContainer } from '../components/Container';
import { Text } from '../components/Themed';
import { appDB } from '../config/firebaseConfig';
import { recoilAuth } from '../hooks/recoilAuth';
import { firstAccessRecoilHook } from '../hooks/recoilFirstAccess';
import { RootStackScreenProps } from '../types';

type InfoType = {
  birthdate: undefined | string,
    weight: undefined | string,
    height: undefined | string,
}

export const birthDateFormat = (valorInput: any) => {
  let value = valorInput.replace(/\D/g, "")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{2})(\d)/, "$1/$2")
  .replace(/(\d{2})(\d)/, "$1")
  if (value.split('/')[2]) {
    if (value.split('/')[2].length > 2) {
     value = value.slice(0, -1)
  }
  }

  return value
  

}

export const cpfMask = (valorInput: any) => {
  
}

export default function FirstAccess({ navigation }: RootStackScreenProps<'Welcome'>) {
    const user = useRecoilValue(recoilAuth)
    const setFirstAccess = useSetRecoilState(firstAccessRecoilHook)
    const [info, setInfo] = React.useState<InfoType>({
        birthdate: "",
        weight: undefined,
        height: undefined,
    })

    const checkIfAllFieldsAreFilled = () => {
        const teste = Object.values(info).includes(undefined)
        return teste
        
    }

    const saveDataInDB = async () => {
        
            set(ref(appDB, 'users/' + user.sub), {
              firstAccess: false
          });
            set(ref(appDB, 'users/' + user.sub + '/base-data'), {
                ...info,
            });
            setFirstAccess(false)



    }


  return (
    <PageContainer style={styles.container}>
          <Title>Olá, {user.given_name}!</Title>
          <Text>Esses dados são utilizados para criar as medidas iniciais do sistema.</Text>
         <ContentContainer>
            <InputContainer>
                    <Input
                    onChangeText={(text: string) => setInfo({...info, birthdate: text})}
                    value={birthDateFormat(info.birthdate)}
                    keyboardType='number-pad'
                    placeholder="Data de nascimento"
                    />
                    <Input
                    onChangeText={(text: string) => setInfo({...info, weight: text})}
                    keyboardType='number-pad'
                    placeholder="Peso em kg"
                    />
                    <Input
                    onChangeText={(text: string) => setInfo({...info, height: text})}
                    
                    keyboardType='number-pad'
                    placeholder="Altura em cm"
                    />
            </InputContainer>
            <ButtonContainer>
                    <Button
                    android_ripple={{
                        color: '#000000f0',
                        borderless: false,
                        radius: 50,
                      }} 
                      onPress={() => {saveDataInDB()}}
                      disabled={checkIfAllFieldsAreFilled()}
                     >
                        <Text style={{color: 'black'}}>Salvar</Text>
                    </Button>
            </ButtonContainer>
         </ContentContainer>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 80
    }
  });
  
const ContentContainer = styled.View`
padding: 24px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
`

const Title = styled.Text`
    margin-top: 28px;
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

const Input = styled.TextInput`
    background-color: white;
      width: 200px;
      height: 50px;
      padding: 12px;
      font-size: 16px;
      border-radius: 12px;
      margin-top: 24px;
`

const InputContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonContainer = styled.View`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`
const Button = styled.Pressable`
    background-color: white;
    width: 125px;
    height: 50px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`
