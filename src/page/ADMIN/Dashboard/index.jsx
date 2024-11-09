import { Space } from "antd";
import { DashboardStyled } from "./styled";
import { CiLogin } from "react-icons/ci";
import { FaBuildingUser } from "react-icons/fa6";
import { BsBuildingCheck } from "react-icons/bs";

const Dashboard = () => {
  return (
    <DashboardStyled>
      <Space size={24}>
        <div className="dash-board_item">
          <div className="d-flex align-items-center">
            <div className="dash-board_item_icon-wrap">
              <CiLogin className="dash-board_item_icon" />
            </div>
            <div className="dash-board_item_title">
              Số lượt <br /> đặt phòng
            </div>
          </div>
          <div>Trong tuần</div>
          <div className="dash-board_item_value">54</div>
        </div>
        <div className="dash-board_item">
          <div className="d-flex align-items-center">
            <div className="dash-board_item_icon-wrap">
              <FaBuildingUser className="dash-board_item_icon" />
            </div>
            <div className="dash-board_item_title">
              Số phòng <br /> đã thuê
            </div>
          </div>
          <div>Trong tuần</div>
          <div className="dash-board_item_value">70</div>
        </div>
        <div className="dash-board_item">
          <div className="d-flex align-items-center">
            <div className="dash-board_item_icon-wrap">
              <BsBuildingCheck className="dash-board_item_icon" />
            </div>
            <div className="dash-board_item_title">Số phòng trống</div>
          </div>
          <div className="dash-board_item_value">54</div>
        </div>
      </Space>
    </DashboardStyled>
  );
};

export default Dashboard;
