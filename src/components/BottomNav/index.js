import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./index.module.css";
import DropDown from "../DropDown";
import { memo } from "react";
import clsx from "clsx";

const navItems = [
  { text: "© 2022 GitHub, Inc.", color: "var(--gray-color)" },
  { text: "Terms" },
  { text: "Privacy" },
  { text: "Security" },
  { text: "Status" },
  { text: "Docs" },
  { text: "Contact Github" },
  { text: "Pricing" },
  { text: "Api" },
  { text: "Training" },
  { text: "Blog" },
  { text: "About" },
];

export default memo(function BottomNav() {
  const navItemClass = styles.navItem;

  const renderIcon = () => (
    <FontAwesomeIcon icon={faGithub} className={styles.icon} />
  );

  const renderNavItems = () =>
    navItems.map((navItem) => (
      <p
        key={navItem.text}
        className={navItemClass}
        style={{ color: navItem.color }}
      >
        {navItem.text}
      </p>
    ));

  return (
    <div className={styles.container}>
      <div className={clsx([styles.navItemsContainer, "row"])}>
        {renderIcon()}
        {renderNavItems()}
      </div>
    </div>
  );
});
