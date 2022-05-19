import styles from "./index.module.css";
import { memo, useContext } from "react";
import clsx from "clsx";
import { SearchContext } from "../../contexts/SearchContext";

const navItems = [
  { text: "Repositories", count: "21K" },
  { text: "Code", count: "3K" },
  { text: "Commits", count: "321K" },
  { text: "Issues", count: "22K" },
  { text: "Discussions", count: "1K" },
  { text: "Packages", count: "210" },
  { text: "MarketPlace", count: "0" },
  { text: "Topics", count: "58" },
  { text: "Wikis", count: "12k" },
  { text: "Users", count: "?", isSelected: true },
];

export default memo(function SideNav() {
  const [search] = useContext(SearchContext);

  const { results } = search;

  if (!results.items.length) return;

  const navItemClass = (item) =>
    clsx([
      styles.navItem,
      {
        [styles.navItemSelected]: item.isSelected,
      },
    ]);

  const renderNavItems = () =>
    navItems.map((navItem) => (
      <div className={navItemClass(navItem)}>
        <p key={navItem.text} className={styles.navItemText}>
          {navItem.text}
        </p>
        <div className={clsx([styles.countWrapper, "px10 py5"])}>
          <p key={navItem.text}>{navItem.count}</p>
        </div>
      </div>
    ));

  return (
    <div className={styles.container}>
      <div className={clsx([styles.navItemsContainer, "col"])}>
        {renderNavItems()}
      </div>
    </div>
  );
});
