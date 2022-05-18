import clsx from "clsx";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import * as searchApi from "../../api/search";
import { SearchContext } from "../../contexts/SearchContext";
import searchActions from "../../actions/searchActions";
import { useSearchParams } from "react-router-dom";
import UsersListItem from "../UsersListItem";

const Search = () => {
  const containerClassName = clsx([styles.container]);
  const [search, dispatch] = useContext(SearchContext);
  const [, setQueryParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    setQueryParams();
  }, []);

  const { query, results } = search;

  const handleInputChange = ({ target: { value } }) => {
    dispatch({ type: searchActions.UPDATE_QUERY, payload: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (query) {
      setQueryParams({ q: query });
      searchApi.getAll(query, page).then((res) => {
        // console.log(JSON.stringify(res, null, 2));
        setTotal(res.total_count);
        setPage((prevPage) => prevPage + 1);
        dispatch({ type: searchActions.UPDATE_RESULTS, payload: res });
      });
    }
  };

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

  const renderUsersList = () => {
    if (!results?.items?.length) return;
    return (
      <div>
        {results?.items?.map(({ login }) => (
          <UsersListItem name={login} key={login} />
        ))}
        <p>total: {total}</p>
        <p>page: {page}</p>
      </div>
    );
  };

  return (
    <div className={containerClassName}>
      {renderTitle()}
      {renderSearchBar()}
      {renderProTip()}
      {renderUsersList()}
    </div>
  );
};

export default Search;
