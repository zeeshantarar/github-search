import clsx from "clsx";
import PropTypes from "prop-types";
import { memo } from "react";
import Button from "../Button";
import styles from "./index.module.css";

const Pagination = memo(({ total, page, onClick }) => {
  const renderPrevBtn = () => (
    <Button className="mx5" text="Previous" onClick={() => null} />
  );

  const renderBtn = (x) => (
    <Button key={x} className="mx5" text={`${x + 1}`} onClick={onClick} />
  );

  const renderBtns = () => {
    const numbers = [...Array(total).keys()];

    const firstFive = page < 5 ? numbers.slice(0, 5) : [];

    const firstTwo = page >= 5 ? numbers.slice(0, 2) : [];

    const midFive =
      page >= 5
        ? [
            ...numbers.slice(page - 2, page),
            numbers[page],
            ...numbers.slice(page + 1, page + 3),
          ]
        : [];

    const lastTwo = numbers.slice(total - 2, total);

    return (
      <>
        {firstTwo.map((x) => renderBtn(x))}
        {page >= 5 ? <p>...</p> : null}
        {firstFive.map((x) => renderBtn(x))}

        {page < 5 ? <p>...</p> : null}
        {midFive.map((x) => renderBtn(x))}
        <p>...</p>
        {lastTwo.map((x) => renderBtn(x))}
      </>
    );
  };

  const renderNextBtn = () => (
    <Button className="mx5" text="Next" onClick={() => null} />
  );

  return (
    <div className={clsx(["row", styles.container])}>
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
