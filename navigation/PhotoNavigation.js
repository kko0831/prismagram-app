import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import theme from "../theme";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select",
      },
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take",
      },
    },
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: theme.blackColor,
        marginBottom: 20,
      },
      labelStyle: {
        color: theme.blackColor,
        fontWeight: "600",
      },
      style: {
        paddingBottom: 20,
        ...stackStyles,
      },
    },
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "Choose Photo",
      },
    },
    UploadPhoto,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles,
      },
    },
  }
);
