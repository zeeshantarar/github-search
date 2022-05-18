import axios from "axios";

export const getAll = async (query, page, perPage = 10) => {
  const res = await axios.get(
    `/search/users?q=${query}&page=${page}&per_page=${perPage}`
  );

  return res.data;
};
