import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import AuthHome from "../screens/Auth/AuthHome";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Signup,
    Login,
    Confirm,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(AuthNavigation);
