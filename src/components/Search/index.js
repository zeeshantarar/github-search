import clsx from "clsx";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useContext, useEffect, useMemo } from "react";
import * as searchApi from "../../api/search";
import { SearchContext } from "../../contexts/SearchContext";
import searchActions from "../../actions/searchActions";
import { useSearchParams } from "react-router-dom";
import UsersListItem from "../UsersListItem";
import Pagination from "../Pagination";

const Search = () => {
  const containerClassName = clsx([styles.container]);
  const [search, dispatch] = useContext(SearchContext);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    setQueryParams();
  }, []);

  const { query, results, page, total } = search;

  const handleInputChange = ({ target: { value } }) => {
    dispatch({ type: searchActions.UPDATE_QUERY, payload: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (query) {
      setQueryParams({ q: query, per_page: 10, page: page });
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
    setQueryParams({ ...queryParams, page: page });

    searchApi.getAll(query, page).then((res) => {
      dispatch({ type: searchActions.UPDATE_RESULTS, payload: res });
    });
  }, [page]);

  const renderTitle = () =>
    query && results ? null : (
      <div className="row mb30">
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        <p className={styles.title}>Search more than 553M users</p>
      </div>
    );

  const renderSearchBar = () =>
    query && results ? null : (
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
    query && results ? null : (
      <p className={styles.tip}>
        <strong>ProTip! </strong>
        For an {renderBlueText("advanced search")}, use some of our{" "}
        {renderBlueText("prefixes.")}
      </p>
    );

  const renderSubHeader = () =>
    total ? (
      <div className={styles.subHeaderContainer}>
        <h1>{total} users</h1>
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

  const renderPagination = useMemo(
    () => (
      <Pagination
        total={Math.min(100, Math.ceil(total / 10))}
        page={page}
        onClick={(p) =>
          dispatch({ type: searchActions.UPDATE_PAGE, payload: p })
        }
      />
    ),
    [total, page]
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
