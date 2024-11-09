import http from "../index";
import { apiLogin, apiRefreshToken } from "./urls";

const login = (body) => http.post(apiLogin, body);
const refreshToken = (body) => http.post(apiRefreshToken, body);

const AuthService = {
  login,
  refreshToken,
};
export default AuthService;
