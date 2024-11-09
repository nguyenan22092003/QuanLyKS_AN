import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "src/lib/storage";
import { resetState } from "src/redux/appGlobal";
import { ROUTER } from "src/router/Router";
import LayoutUser from "../LayoutCommon/LayoutUser";
import SvgIcon from "../SvgIcon";
import { HeaderStyle, StyleMenuAccount } from "./styled";
import "./styles.scss";

const Header = ({ isAdmin }) => {
  const { userInfo } = useSelector((state) => state.appGlobal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    navigate(ROUTER.LOGIN);
    clearStorage();
    dispatch(resetState());
  };

  const menuAccount = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            <Menu.Item
              key="7"
              style={{ color: "#ED1117" }}
              onClick={handleLogout}
            >
              <div className="btn-logout">
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  );

  return (
    <HeaderStyle>
      <div className={`header-app justify-content-space-between header-admin`}>
        <LayoutUser className="d-flex align-items-center justify-content-space-between pl-24 pr-24">
          <div className="fs-20 fw-600" style={{ color: "#fff" }}>
            Quản lý khách sạn
          </div>
          {userInfo?.username ? (
            <Dropdown
              overlay={menuAccount}
              overlayStyle={{ minWidth: "200px" }}
            >
              <div className="d-flex align-items-center pointer">
                <Avatar size={32} icon={<UserOutlined />} />
                <div
                  className="ml-8 d-flex align-items-center"
                  style={{ color: "#fff" }}
                >
                  <div className="fs-15 mr-4">{userInfo.username}</div>
                  <IoMdArrowDropdown className="fs-20" />
                </div>
              </div>
            </Dropdown>
          ) : (
            // <div
            //   className=" d-flex align-items-center pointer"
            //   style={{ color: "#fff" }}
            //   onClick={() => navigate(ROUTER.LOGIN)}
            // >
            //   <FaUser className="fs-14" />
            //   <div className="fs-15 ml-6">Đăng nhập</div>
            // </div>
            <></>
          )}
        </LayoutUser>
      </div>
    </HeaderStyle>
  );
};

export default Header;
