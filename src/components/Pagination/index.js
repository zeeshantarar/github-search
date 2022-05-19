import clsx from "clsx";
import PropTypes from "prop-types";
import { memo } from "react";
import Button from "../Button";
import styles from "./index.module.css";

const Pagination = memo(({ total, page, onClick }) => {
  if (!total) return;

  const btnClass = (x) =>
    clsx([
      styles.btn,
      "mx5",
      {
        [styles.bgBlue]: x + 1 === page,
      },
    ]);

  const renderPrevBtn = () => (
    <Button
      className={clsx([btnClass(), { [styles.borderBlue]: page !== 1 }])}
      disabled={page === 1}
      text="Previous"
      onClick={() => onClick(page - 1)}
    />
  );

  const renderBtn = (x) => (
    <Button
      key={x}
      className={btnClass(x)}
      text={`${x + 1}`}
      onClick={() => onClick(x + 1)}
    />
  );

  const renderBtns = () => {
    const numbers = [...Array(total).keys()];

    const firstFive = page < 5 ? numbers.slice(0, 5) : [];

    const firstTwo = page >= 5 ? numbers.slice(0, 2) : [];

    const midFive =
      page >= 5
        ? [
            ...numbers.slice(page - 2, page + 1),
            ...numbers.slice(page + 1, page + 1),
          ]
        : [];

    const lastTwo = page < total - 2 ? numbers.slice(total - 2, total) : [];

    return (
      <>
        {firstTwo.map((x) => renderBtn(x))}
        {page >= 5 ? <p>...</p> : null}
        {firstFive.map((x) => renderBtn(x))}

        {page < 5 ? <p>...</p> : null}
        {midFive.map((x) => renderBtn(x))}
        {page < total - 2 ? <p>....</p> : null}
        {lastTwo.map((x) => renderBtn(x))}
      </>
    );
  };

  const renderNextBtn = () => (
    <Button
      disabled={page === total}
      className={clsx([btnClass(), { [styles.borderBlue]: page !== total }])}
      text="Next"
      onClick={() => onClick(page + 1)}
    />
  );

  return (
    <div className={clsx([styles.container])}>
      {renderPrevBtn()}
      {renderBtns()}
      {renderNextBtn()}
    </div>
  );
});

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
