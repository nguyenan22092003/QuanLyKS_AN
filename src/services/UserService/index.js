import http from "../index";

const getUser = (params) => http.get(`users`, { params });
const getOneUser = (id) => http.get(`users/${id}`);
const addUser = (body) => http.post(`users/new`, body);
const updateUser = (id, body) => http.put(`users/${id}`, body);
const deleteUser = (id) => http.delete(`users/${id}`);

const UserService = {
  getUser,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
};
export default UserService;
