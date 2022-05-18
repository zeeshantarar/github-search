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
    <img className={styles.profilePic} src={userInfo?.avatar_url} />
  );

  const renderNames = () => (
    <a className={styles.githubLink} href={userInfo?.html_url}>
      <div className="row">
        <h2 className="blue-text">{userInfo?.name} &nbsp;</h2>
        <h2 className={clsx(["blue-text", styles.name])}>{userInfo?.login}</h2>
      </div>
    </a>
  );

  const renderBio = () => (
    <div className={styles.bioContainer}>
      <p>{userInfo?.bio}</p>
    </div>
  );

  const renderFollows = () => (
    <div className="row my10">
      <p>Followers: {userInfo?.followers}&nbsp;</p>
      <p>Following: {userInfo?.following}</p>
    </div>
  );

  const renderUserInfo = () => {
    return (
      <div>
        {renderNames()}
        {renderBio()}
        {renderFollows()}
        <p>{userInfo?.location}</p>
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
