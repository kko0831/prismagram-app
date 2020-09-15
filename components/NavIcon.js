import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import theme from "../theme";

const NavIcon = ({ name, color = theme.blackColor, size = 26 }) => (
  <Ionicons name={name} color={color} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default NavIcon;
