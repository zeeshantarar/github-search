import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import styles from "./index.module.css";
import { memo } from "react";

const Button = memo(({ text, icon, onClick, className, disabled }) => {
  const containerClassName = clsx([
    styles.container,
    className,
    {
      [styles.disabled]: disabled,
    },
  ]);

  return (
    <div
      className={containerClassName}
      onClick={disabled ? () => null : onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      <p className={styles.text}>{text}</p>
    </div>
  );
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
