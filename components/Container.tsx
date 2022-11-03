import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.View`
  flex: 1;
  padding: 16px;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const Greetings = styled.View``;

export const Title = styled.Text`
  font-size: 48px;
  color: white;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: bold;
  margin: 6px;
`;


export const GreetingsContainer = styled.View`
  margin: 48px 0px 64px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 999px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
`;

export const SectionTitle = styled.Text`
  margin-bottom: 18px;
  font-size: 24px;
  color: #fff;
`;

export const LastMeals = styled.View`
  margin-top: 48px;
`;

export const MealItem = styled.View`
  width: 150px;
  height: 200px;
  background-color: #f2f2f2;
  margin-right: 16px;
  border-radius: 16px;
`;

export const FoodTracking = styled.View`
  margin-top: 24px;
  background-color: #313131;
  border-radius: 16px;
  padding: 16px;
  min-height: 100px;
`;

export const FTHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`

export const FoodTrackingIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background-color: #f2f2f2;
`;

export const HomeLogo = styled.Image`
  width: fit-content;
`;
