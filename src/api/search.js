import axios from "axios";
import { PER_PAGE } from "../constants/search";

export const getAll = async (query, page, perPage = PER_PAGE) => {
  const res = await axios.get(
    `/search/users?q=${query}&page=${page}&per_page=${perPage}`
  );

  return res.data;
};
