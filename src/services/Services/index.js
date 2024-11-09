import http from "../index";

const getService = (params) => http.get(`services`, { params });
const getOneService = (id) => http.get(`services/${id}`);
const addService = (body) => http.post(`services/new`, body);
const updateService = (id, body) => http.put(`services/${id}`, body);
const deleteService = (id) => http.delete(`services/${id}`);

const Services = {
  getService,
  getOneService,
  addService,
  updateService,
  deleteService,
};
export default Services;
