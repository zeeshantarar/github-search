import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import DropDown from "../DropDown";
import clsx from "clsx";
import { memo, useContext, useMemo } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import searchActions from "../../actions/searchActions";

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

const TopNav = memo(() => {
  const containerClass = clsx([styles.container, "row"]);
  const navItemClass = styles.navItem;

  const [search, dispatch] = useContext(SearchContext);
  const { query, results } = search;

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

  const handleInputChange = (event) =>
    dispatch({ type: searchActions.UPDATE_QUERY, payload: event.target.value });

  const renderSearchBar = () =>
    query && results ? (
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={query}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon icon={faPenToSquare} className={styles.inputIcon} />
        {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
      </div>
    ) : null;

  const renderRightNavItems = () => (
    <div className={clsx(["row", styles.rightNavItemsContainer])}>
      {renderSearchBar()}
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

export default TopNav;
