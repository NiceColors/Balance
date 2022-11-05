import { View, ScrollView, Image } from "react-native";
import { useRecoilValue } from "recoil";
import {
  FoodTracking,
  FTHeaderContainer,
  Info,
  Content,
  FoodTrackingIcon,
  Greetings,
  LastMeals,
  SectionTitle,
  GreetingsContainer,
  MealItem,
  Profile,
  PageContainer,
  Title,
  SubTitle,
} from "../components/Container";
import { Text } from "../components/Themed";
import { recoilAuth } from "../hooks/recoilAuth";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
const user = useRecoilValue(recoilAuth)

  return (
    <PageContainer>
      <GreetingsContainer>
        <Greetings>
          <Text>Bem vindo de volta</Text>
          <Title>{user.given_name}</Title>
        </Greetings>
        <Profile source={{
            uri: user.picture
          }}>
        </Profile>
      </GreetingsContainer>



      <Text>Última Medição em 14/05/22</Text>
      <FoodTracking>
        <FTHeaderContainer>

          <Content>
            <Text>Nível de Gordura</Text>

            <Info>
              <FoodTrackingIcon />
              <SubTitle>90,1</SubTitle>
              <Text>kg</Text>
            </Info>
          </Content>

          <Content>
            <Text>TMB</Text>

            <Info>
              <FoodTrackingIcon />
              <SubTitle>1500</SubTitle>
              <Text>kcal</Text>
            </Info>
          </Content>

        </FTHeaderContainer>
      </FoodTracking>


      <LastMeals>
        <SectionTitle>Refeições do Dia</SectionTitle>

        <ScrollView horizontal={true}>
          {new Array(4).fill(0).map((_, index) => (
            <MealItem key={index} />
          ))}
        </ScrollView>
      </LastMeals>
    </PageContainer>
  );
}

