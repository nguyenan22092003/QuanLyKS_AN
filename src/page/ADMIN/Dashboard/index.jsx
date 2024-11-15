import { Space, Spin } from "antd";
import { DashboardStyled } from "./styled";
import { CiLogin } from "react-icons/ci";
import { FaBuildingUser } from "react-icons/fa6";
import { BsBuildingCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import BookingService from "src/services/BookingService";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const getStatistic = async () => {
    try {
      setLoading(true);
      const res = await BookingService.statistical();
      if (res.status !== "success") return;
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStatistic();
  }, []);
  return (
    <DashboardStyled>
      <Spin spinning={loading}>
        <Space size={24}>
          <div className="dash-board_item">
            <div className="d-flex align-items-center">
              <div className="dash-board_item_icon-wrap">
                <CiLogin className="dash-board_item_icon" />
              </div>
              <div className="dash-board_item_title">
                Number of <br /> bookings
              </div>
            </div>
            <div style={{ color: "#888" }} className="fw-600 mt-8">
              During the week
            </div>
            <div className="dash-board_item_value">{data?.countBooking}</div>
          </div>
          <div className="dash-board_item">
            <div className="d-flex align-items-center">
              <div className="dash-board_item_icon-wrap">
                <FaBuildingUser className="dash-board_item_icon" />
              </div>
              <div className="dash-board_item_title">
                Number of <br /> rooms rented
              </div>
            </div>
            <div style={{ color: "#888" }} className="fw-600 mt-8">
              During the week
            </div>
            <div className="dash-board_item_value">
              {data?.countBooingConfirmed}
            </div>
          </div>
          <div className="dash-board_item item-special">
            <div className="d-flex align-items-center justify-content-space-between">
              <div className="dash-board_item_icon-wrap">
                <BsBuildingCheck className="dash-board_item_icon" />
              </div>
              <div className="flex-center percent-room">
                {data?.percentEmptyRoom}%
              </div>
            </div>
            <div className="text-center fs-50 fw-600">{data?.emptyRoom}</div>
            <div className="text-center fs-18 fw-600 mt-12">
              Room Availability
            </div>
          </div>
        </Space>
      </Spin>
    </DashboardStyled>
  );
};

export default Dashboard;
