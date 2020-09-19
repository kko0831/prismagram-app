import React, { useState } from "react";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useLogOut } from "../AuthContext";
import theme from "../theme";
import constants from "../constants";
import Button from "./Button";
import FollowButton from "./FollowButton";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

// 프로필 Header
const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${theme.darkGreyColor};
`;

// 프로필 fullName + Button
const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const ProfileButton = styled.View``;

// 프로필 footer
const MenuContainer = styled.View`
  padding-vertical: 5px;
  border: 1px solid ${theme.lightGreyColor};
  flex-direction: row;
  margin-top: 30px;
`;

const Menu = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const PhotoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const UserProfile = ({
  id,
  username,
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  isFollowing,
  isSelf,
  fullName,
  posts,
}) => {
  const logOut = useLogOut();
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <ProfileButton>
          {isSelf ? (
            <Button text="로그아웃" onPress={logOut} />
          ) : (
            <FollowButton
              isFollowing={isFollowing}
              id={id}
              username={username}
            />
          )}
        </ProfileButton>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <MenuContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Menu>
            <Ionicons
              color={isGrid ? theme.black : theme.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Menu>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Menu>
            <Ionicons
              color={!isGrid ? theme.black : theme.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Menu>
        </TouchableOpacity>
      </MenuContainer>
      <PhotoContainer>
        {posts &&
          posts.map((p) => (isGrid ? <SquarePhoto key={p.id} {...p} /> : null))}
      </PhotoContainer>
      {posts && posts.map((p) => (isGrid ? null : <Post key={p.id} {...p} />))}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};
export default UserProfile;
