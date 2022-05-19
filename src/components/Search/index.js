import clsx from "clsx";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useCallback, useContext, useEffect, useMemo } from "react";
import * as searchApi from "../../api/search";
import { SearchContext } from "../../contexts/SearchContext";
import searchActions from "../../actions/searchActions";
import { useSearchParams, useLocation } from "react-router-dom";
import UsersListItem from "../UsersListItem";
import Pagination from "../Pagination";
import { PER_PAGE } from "../../constants/search";

const Search = () => {
  const containerClassName = clsx([styles.container]);
  const [search, dispatch] = useContext(SearchContext);
  const [, setQueryParams] = useSearchParams();
  const location = useLocation();

  const { query, results, page, total } = search;

  const handleInputChange = ({ target: { value } }) => {
    dispatch({ type: searchActions.UPDATE_QUERY, payload: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (query) {
      setQueryParams({ q: query, per_page: PER_PAGE, page: page });
      searchApi.getAll(query, page).then((res) => {
        dispatch({
          type: searchActions.UPDATE_TOTAL,
          payload: res.total_count,
        });

        dispatch({ type: searchActions.UPDATE_RESULTS, payload: res });
      });
    }
  };

  useEffect(() => {
    const routeQuery = new URLSearchParams(location.search).get("q");
    const routePage = parseInt(
      new URLSearchParams(location.search).get("page")
    );

    if (routeQuery && routePage) {
      dispatch({ type: searchActions.UPDATE_QUERY, payload: routeQuery });
      dispatch({ type: searchActions.UPDATE_PAGE, payload: routePage });

      searchApi.getAll(routeQuery, routePage).then((res) => {
        dispatch({ type: searchActions.UPDATE_RESULTS, payload: res });

        dispatch({
          type: searchActions.UPDATE_TOTAL,
          payload: res.total_count,
        });
      });
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    searchApi.getAll(query, page).then((res) => {
      dispatch({ type: searchActions.UPDATE_RESULTS, payload: res });
    });
  }, [page, dispatch]);

  const renderTitle = () =>
    results.items.length ? null : (
      <div className="row mb30">
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        <p className={styles.title}>Search more than 553M users</p>
      </div>
    );

  const renderSearchBar = () =>
    results.items.length ? null : (
      <form className="row" onSubmit={handleSearchSubmit}>
        <input
          className={styles.input}
          placeholder="Search GitHub"
          value={query || ""}
          onChange={handleInputChange}
        />
        <Button text="Search" onClick={handleSearchSubmit} />
      </form>
    );

  const renderBlueText = (text) => <span className="blue-text">{text}</span>;

  const renderProTip = () =>
    results.items.length ? null : (
      <p className={styles.tip}>
        <strong>ProTip! </strong>
        For an {renderBlueText("advanced search")}, use some of our{" "}
        {renderBlueText("prefixes.")}
      </p>
    );

  const renderSubHeader = () =>
    total ? (
      <div className={styles.subHeaderContainer}>
        <h2>{total} users</h2>
      </div>
    ) : null;

  const renderUsersList = useMemo(() => {
    if (!results?.items?.length) return;
    return (
      <div>
        {results?.items?.map(({ login }) => (
          <UsersListItem name={login} key={login} />
        ))}
      </div>
    );
  }, [results]);

  const handlePaginationClick = useCallback(
    (p) => {
      dispatch({ type: searchActions.UPDATE_PAGE, payload: p });
      setQueryParams({ q: query, per_page: PER_PAGE, page: p });
    },
    [query, dispatch, setQueryParams]
  );

  const renderPagination = useMemo(
    () => (
      <Pagination
        total={Math.min(100, Math.ceil(total / PER_PAGE))}
        page={page}
        onClick={handlePaginationClick}
      />
    ),
    [total, page, handlePaginationClick]
  );

  return (
    <div className={containerClassName}>
      {renderTitle()}
      {renderSearchBar()}
      {renderProTip()}
      {renderSubHeader()}
      {renderUsersList}
      {renderPagination}
    </div>
  );
};

export default Search;
