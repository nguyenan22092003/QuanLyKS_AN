import http from "../index";

const getRoom = (params) => http.get(`rooms`, { params });
const getOneRoom = (id) => http.get(`rooms/${id}`);
const addRoom = (body) => http.post(`rooms/new`, body);
const updateRoom = (id, body) => http.put(`rooms/${id}`, body);
const deleteRoom = (id) => http.delete(`rooms/${id}`);

const RoomService = {
  getRoom,
  getOneRoom,
  addRoom,
  updateRoom,
  deleteRoom,
};
export default RoomService;
