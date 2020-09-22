import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import theme from "../../theme";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View``;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${theme.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 5px;
  width: ${constants.width - 150};
`;

const Button = styled.TouchableOpacity`
  background-color: ${theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: navigation.getParam("photo").uri }}
          style={{ height: 80, width: 80, marginRight: 20 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={theme.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={theme.darkGreyColor}
          />
          <Button onPress={() => handleSubmit()}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
