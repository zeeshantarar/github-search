import clsx from "clsx";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const searchIcon = "fal fa-search";

export default function Search() {
  const containerClassName = clsx([styles.container]);

  const renderTitle = () => (
    <div>
      <FontAwesomeIcon icon={searchIcon} className={styles.icon} />
      <p>Search more than 90M users</p>
    </div>
  );

  return <div className={containerClassName}>{renderTitle()}</div>;
}
