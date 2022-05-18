import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./index.module.css";
import clsx from "clsx";

const DropDown = memo(({ text, items }) => {
  const [showList, setShowList] = useState(false);

  const titleContainerClasses = clsx([styles.titleContainer, "row"]);

  const renderTitle = () => (
    <div
      className={titleContainerClasses}
      onMouseOver={() => setShowList(true)}
    >
      <p className={styles.title}>{text}</p>
      <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
    </div>
  );

  const renderItems = () => {
    return showList ? (
      <div
        className={styles.itemsContainer}
        onMouseLeave={() => setShowList(false)}
      >
        {items.map((item) => (
          <p key={item} className={styles.item}>
            {item}
          </p>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      {renderTitle()}
      {renderItems()}
    </div>
  );
});

DropDown.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default DropDown;
