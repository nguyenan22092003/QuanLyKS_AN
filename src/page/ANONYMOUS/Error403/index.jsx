import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import STORAGE, { getStorage } from "src/lib/storage";
import { ROUTER } from "src/router/Router";

const isAuthenticated = () => {
  return getStorage(STORAGE.TOKEN);
};

function Error403() {
  return (
    <Result
      status="403"
      title="403 Not Authorized"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <NavLink to={isAuthenticated() ? ROUTER.DASHBOARD : ROUTER.LOGIN}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" className="btn-hover-shadow">
              Quay lại trang chủ
            </Button>
          </div>
        </NavLink>
      }
    />
  );
}
export default Error403;
