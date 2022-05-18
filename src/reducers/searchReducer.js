import searchActions from "../actions/searchActions";

export default function reducer(state, action) {
  switch (action.type) {
    case searchActions.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case searchActions.UPDATE_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      throw new Error();
  }
}
