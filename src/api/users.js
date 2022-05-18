import axios from "axios";

export const getAll = async (query) => {
  const res = await axios.get(`/users?q=${query}`);

  return res.data;
};
