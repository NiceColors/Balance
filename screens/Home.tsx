import { View, ScrollView } from "react-native";
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
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <PageContainer>
      <GreetingsContainer>
        <Greetings>
          <Text>Bem vindo de volta</Text>
          <Title>Paçoca</Title>
        </Greetings>
        <Profile />
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
