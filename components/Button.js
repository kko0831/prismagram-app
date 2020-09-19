import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";

const Container = styled.Text`
  border: 0;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: ${theme.blueColor};
  text-align: center;
  padding: 5px;
  margin: 5px;
  font-size: 14px;
`;

const Touchable = styled.TouchableOpacity``;

const Button = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>{text}</Container>
  </Touchable>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
