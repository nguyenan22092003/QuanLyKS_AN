import http from "../index";

const getBooking = (params) => http.get(`bookings`, { params });
const addBooking = (body) => http.post(`bookings/new`, body);
const updateBooking = (id, body) => http.put(`bookings/${id}`, body);
const cancelBooking = (id, body) => http.patch(`bookings/${id}/cancel`, body);
const confirmBooking = (id, body) => http.patch(`bookings/${id}/confirm`, body);
const completeBooking = (id, body) =>
  http.patch(`bookings/${id}/complete`, body);
const paymentBooking = (id, body) => http.patch(`bookings/${id}/payment`, body);
const statistical = (id, body) => http.get(`bookings/statistical`);

const BookingService = {
  getBooking,
  addBooking,
  updateBooking,
  cancelBooking,
  confirmBooking,
  completeBooking,
  paymentBooking,
  statistical,
};
export default BookingService;
