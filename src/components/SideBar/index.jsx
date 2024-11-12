import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "src/router/Router";
import "./styled.js";
import { SideBarStyle } from "./styled.js";
import { MdDashboard } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";

const items = [
  {
    label: "Dashboard",
    key: ROUTER.DASHBOARD,
    icon: <MdDashboard />,
  },
  {
    label: "Phòng",
    key: "subMenu",
    icon: <FaRegBuilding />,
    children: [
      {
        label: "Quản lý đặt phòng",
        key: ROUTER.BOOKING_MANAGER,
      },
      {
        label: "Quản lý phòng",
        key: ROUTER.ROOM_MANAGER,
      },
    ],
  },
  {
    label: "Khách hàng",
    key: ROUTER.CUSTOMERS_MANAGER,
    icon: <FaUser />,
  },
  // {
  //   label: "Dịch vụ",
  //   key: ROUTER.SERVICES_MANAGER,
  //   icon: <MdOutlineCleaningServices />,
  // },
  // {
  //   label: "Thiết bị",
  //   key: ROUTER.DEVICES_MANAGER,
  //   icon: <MdDevicesOther />,
  // },
];

function SideBar({ children }) {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState([]);
  const onClick = (e) => {
    navigate(e.key);
  };
  useEffect(() => {
    setActiveKey([window.location.pathname]);
  }, [window.location.pathname]);

  return (
    <SideBarStyle>
      <div className="d-flex align-items-flex-start wrap-section">
        <Menu
          onClick={onClick}
          className="menu-app"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          selectedKeys={activeKey}
          mode="inline"
          items={items}
        />
        <div className="wrap-page">{children}</div>
      </div>
    </SideBarStyle>
  );
}

export default SideBar;
