import http from "../index";

const getBooking = (params) => http.get(`bookings`, { params });
const addBooking = (body) => http.post(`bookings/new`, body);
const updateBooking = (id, body) => http.put(`bookings/${id}`, body);

const BookingService = {
  getBooking,
  addBooking,
  updateBooking,
};
export default BookingService;
