import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./index.module.css";
import DropDown from "../DropDown";
import clsx from "clsx";
import { memo, useMemo } from "react";

const leftNavItems = [
  {
    text: "Product",
    items: ["Feature", "Mobile", "Actions", "CodeSpaces", "Packages"],
  },
  { text: "Team" },
  { text: "Enterprise" },
  {
    text: "Explore",
    items: ["Feature", "Mobile", "Actions", "CodeSpaces", "Packages"],
  },
  { text: "Marketplace" },
  {
    text: "Pricing",
    items: ["Feature", "Mobile", "Actions", "CodeSpaces", "Packages"],
  },
];

const rightNavItems = [{ text: "Sign in" }, { text: "Sign up" }];

export default memo(function TopNav() {
  const containerClass = clsx([styles.container, "row"]);
  const navItemClass = styles.navItem;

  const renderIcon = () => (
    <FontAwesomeIcon icon={faGithub} className={styles.icon} />
  );

  const renderLeftNavItems = useMemo(
    () =>
      leftNavItems.map((navItem) =>
        navItem.items ? (
          <DropDown
            text={navItem.text}
            items={navItem.items}
            key={navItem.text}
          />
        ) : (
          <p key={navItem.text} className={navItemClass}>
            {navItem.text}
          </p>
        )
      ),
    [rightNavItems]
  );

  const renderRightNavItems = () => (
    <div className={clsx(["row", styles.rightNavItemsContainer])}>
      {rightNavItems.map((navItem) => (
        <p key={navItem.text} className={navItemClass}>
          {navItem.text}
        </p>
      ))}
    </div>
  );

  return (
    <div className={containerClass}>
      {renderIcon()}
      {renderLeftNavItems}
      {renderRightNavItems()}
    </div>
  );
});
