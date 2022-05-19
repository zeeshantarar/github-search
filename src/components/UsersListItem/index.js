import { PropTypes } from "prop-types";
import { memo, useEffect, useState } from "react";
import styles from "./index.module.css";
import * as usersApi from "../../api/users";
import Button from "../Button";
import clsx from "clsx";

const UsersListItem = memo(({ name }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    usersApi.get(name).then((res) => {
      setUserInfo(res);
    });
  }, [name]);

  const renderProfilePic = () => (
    <img
      className={styles.profilePic}
      src={userInfo?.avatar_url}
      alt="avatar"
    />
  );

  const renderNames = () => (
    <a className={styles.githubLink} href={userInfo?.html_url}>
      <div className="row">
        {userInfo?.name ? (
          <h3 className="blue-text">{userInfo?.name} &nbsp;</h3>
        ) : null}
        <h3 className={clsx(["blue-text", styles.darkGray])}>
          {userInfo?.login || <i>username</i>}
        </h3>
      </div>
    </a>
  );

  const renderBio = () => (
    <div className={styles.bioContainer}>
      <p>{userInfo?.bio || <i>description</i>}</p>
    </div>
  );

  const renderFollows = () => (
    <div className="row my10">
      <p>Followers: {userInfo?.followers || <i>followers_count</i>}&nbsp;</p>
      <p>Following: {userInfo?.following || <i>following_count</i>}</p>
    </div>
  );

  const renderLocation = () => (
    <p className={styles.darkGray}>{userInfo?.location}</p>
  );

  const renderUserInfo = () => {
    return (
      <div>
        {renderNames()}
        {renderBio()}
        {renderFollows()}
        {renderLocation()}
      </div>
    );
  };

  const renderFollowBtn = () => (
    <div className={styles.btnContainer}>
      {<Button text="Follow" onClick={() => null} />}
    </div>
  );

  return (
    <div className={styles.container}>
      {renderProfilePic()}
      {renderUserInfo()}
      {renderFollowBtn()}
    </div>
  );
});

UsersListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UsersListItem;
