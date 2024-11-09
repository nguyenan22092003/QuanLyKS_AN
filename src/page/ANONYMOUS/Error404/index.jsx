import { Button, Result } from "antd";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import STORAGE, { getStorage } from "src/lib/storage";
import { ROUTER } from "src/router/Router";
const isAuthenticated = () => {
  return getStorage(STORAGE.TOKEN);
};
function Error404() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (getStorage(STORAGE.TOKEN)) return navigate(ROUTER.DASHBOARD);
      navigate(ROUTER.LOGIN);
    }
  }, [window.location.pathname]);
  return (
    <Result
      status="404"
      title="404 NotFound"
      subTitle="Sorry, the page you visited does not exist."
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
export default Error404;
