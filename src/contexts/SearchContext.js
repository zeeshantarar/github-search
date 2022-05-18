import { createContext, useReducer } from "react";
import reducer from "../reducers/searchReducer";

const initialState = { query: "", results: null, page: 1, total: 0 };

export const SearchContext = createContext();

export default function SearchProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={[state, dispatch]}>
      {props.children}
    </SearchContext.Provider>
  );
}
