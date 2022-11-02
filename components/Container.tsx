import { StatusBar} from 'react-native'
import styled from 'styled-components/native';


export const PageContainer = styled.View`
flex: 1;
padding: 12px;
padding-top: ${StatusBar.currentHeight}px;
`; 

export const Greetings = styled.View`
    margin-top: 48px;
`

export const Title = styled.Text`
    font-size: 48px;
    color: white;
    font-weight: bold;
`

export const HomeLogo = styled.Image`
    width: fit-content;
`