import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Browse: undefined;
  FoodDetail: { id: string };
  Payment: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Browse: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};
