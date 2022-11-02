import { View } from 'react-native'
import { Greetings, PageContainer, Title } from '../components/Container'
import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <PageContainer>
        <Greetings>
          <Text>Bem vindo de volta</Text>
          <Title >Paçoca</Title>
        </Greetings>
    </PageContainer>
  );
}
