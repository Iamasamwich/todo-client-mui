import api from "../api/api";

export const ping = async () => {
  return await api('/ping', 'GET')
  .catch(err => {});
};