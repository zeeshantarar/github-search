import axios from "axios";

export const get = async (name) => {
  const res = await axios.get(`/users/${name}`);

  return res.data;
};
