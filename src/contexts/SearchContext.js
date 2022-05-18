import { createContext, useReducer, useState } from "react";
import reducer from "../reducers/searchReducer";

const initialState = { query: "", results: null };

export const SearchContext = createContext();

export default function SearchProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={[state, dispatch]}>
      {props.children}
    </SearchContext.Provider>
  );
}
