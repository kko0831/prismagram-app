import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import Button from "./Button";

const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

const GET_USER_FOLLOW = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      followersCount
      isFollowing
      isSelf
    }
  }
`;

const GET_ME_FOLLOW = gql`
  query me {
    me {
      id
      followingCount
    }
  }
`;

const FollowButton = ({ id, isFollowing: isFollowingProp, username }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);
  const [followMutation] = useMutation(FOLLOW, {
    variables: { id },
    refetchQueries: [
      { query: GET_USER_FOLLOW, variables: { username } },
      { query: GET_ME_FOLLOW },
    ],
    awaitRefetchQueries: true,
  });
  const [unFollowMutation] = useMutation(UNFOLLOW, {
    variables: { id },
    refetchQueries: [
      { query: GET_USER_FOLLOW, variables: { username } },
      { query: GET_ME_FOLLOW },
    ],
    awaitRefetchQueries: true,
  });
  const handleFollow = () => {
    if (isFollowing === true) {
      unFollowMutation();
      setIsFollowing(false);
    } else {
      followMutation();
      setIsFollowing(true);
    }
  };
  return (
    <Button
      onPress={handleFollow}
      text={isFollowing ? "팔로우 취소" : "팔로우"}
    />
  );
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButton;
