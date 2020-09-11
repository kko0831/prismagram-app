import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Facebook } from "expo";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
      return Alert.alert("이메일을 적어주세요");
    } else if (!email.includes("@") || !email.includes(".")) {
      return Alert.alert("이메일 형식을 지켜주세요");
    } else if (!emailRegex.test(email)) {
      return Alert.alert("이메일이 유효하지 않습니다");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (lName === "") {
      return Alert.alert("성을 적어주세요");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "594162471510048",
        {
          permissions: ["public_profile"],
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignup} text="Sign up" />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
