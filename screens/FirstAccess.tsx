import React from 'react'
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {  PageContainer } from '../components/Container';
import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';

type InfoType = {
    age: undefined | string,
    weight: undefined | string,
    height: undefined | string,
}
export default function FirstAccess({ navigation }: RootStackScreenProps<'NotFound'>) {
    const [info, setInfo] = React.useState<InfoType>({
        age: undefined,
        weight: undefined,
        height: undefined,
    })

    const checkIfAllFieldsAreFilled = () => {
        const teste = Object.values(info).includes(undefined)
        return teste
        
    }
  return (
    <PageContainer style={styles.container}>
          <Title>Informações base</Title>
          <Text>Esses dados são utilizados para criar as medidas iniciais do sistema.</Text>
         <ContentContainer>
            <InputContainer>
                    <Input
                    onChangeText={(text: string) => setInfo({...info, age: text})}
                    keyboardType='number-pad'
                    placeholder="Idade"
                    onC
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
                      onPress={() => {}}
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
