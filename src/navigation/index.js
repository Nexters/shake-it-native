import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from '../view/main/Main';
import Choice from '../view/choice/Choice';

const AuthStack = createStackNavigator(
  {
    MainScreen: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      }
    },
    ChoiceScreen: {
      screen: Choice,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'MainScreen'
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth',
  }
);

export default createAppContainer(AppNavigator);
