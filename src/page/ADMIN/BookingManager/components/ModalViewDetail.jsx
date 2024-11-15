import { Col, Row, Space, Table } from "antd";
import moment from "moment";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import { formatMoneyVND } from "src/lib/utils";

const ModalViewDetail = ({
  open,
  onCancel,
  confirmBooking,
  cancelBooking,
  completeBooking,
  confirmPaid,
  updateBooking,
  deleteBooking,
}) => {
  console.log("open: ", open);
  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      align: "center",
      width: 60,
      render: (val, record, index) => index + 1,
    },
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number of people accommodated",
      dataIndex: "numberPeople",
      key: "numberPeople",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => (val ? formatMoneyVND(+val) : ""),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  const renderFooter = () => (
    <Space size={12}>
      <Button btnType="gray" onClick={onCancel}>
        Close
      </Button>
      {open.status_booking !== "WAITING" &&
        open.status_payment === "UNPAID" && (
          <Button btnType="primary" onClick={confirmPaid}>
            Payment
          </Button>
        )}
      {open.status_booking === "CONFIRMED" && (
        <Button btnType="primary" onClick={completeBooking}>
          Done
        </Button>
      )}
      {open.status_booking === "WAITING" && (
        <>
          <Button btnType="primary" onClick={confirmBooking}>
            Confirm
          </Button>
          <Button btnType="danger" onClick={cancelBooking}>
            Cancel
          </Button>
          <Button btnType="primary" onClick={updateBooking}>
            Edit Booking
          </Button>
          <Button btnType="danger" onClick={deleteBooking}>
            Delete Booking
          </Button>
        </>
      )}
    </Space>
  );
  return (
    <CustomModal
      title={"Booking Detail"}
      footer={renderFooter()}
      width={1000}
      open={open}
      onCancel={onCancel}
    >
      <div className="fs-18 fw-600 mb-12">Booker Information</div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Booker:{" "}
            </div>
            {`${open?.account?.firstName} ${open?.account?.lastName}`}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Booker's phone number:{" "}
            </div>
            {open?.account?.phoneNumber}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Citizen Identification Card:{" "}
            </div>
            {open?.account?.citizenIdentificationCard}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Email:{" "}
            </div>
            {open?.account?.email}
          </div>
        </Col>
        <Col span={24}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Address:{" "}
            </div>
            {open?.account?.address}
          </div>
        </Col>
        <Col span={24} className="fs-18 fw-600">
          Booking Information
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Number of People:{" "}
            </div>
            {open?.numberPeople}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Number of Rooms Booked:{" "}
            </div>
            {open?.rooms?.length}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Check-in Date:{" "}
            </div>
            {moment(open?.arrivalDate).format("YYYY-MM-DD")}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Check-out Date:{" "}
            </div>
            {moment(open?.departureDate).format("YYYY-MM-DD")}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Status booking:{" "}
            </div>
            {open?.status_booking}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Status payment:{" "}
            </div>
            {open?.status_payment}
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Total Price:{" "}
            </div>
            <div className="fs-16 fw-600">
              {formatMoneyVND(
                open?.rooms?.reduce((total, item) => total + item.price, 0)
              )}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center">
            <div className="fs-14 fw-500 mr-6" style={{ whiteSpace: "nowrap" }}>
              Description:{" "}
            </div>
            <div className="fs-16 fw-600">
                {open?.description}
            </div>
          </div>
        </Col>
      </Row>
      <div className="fs-18 fw-600 mt-20 mb-12">List Rooms</div>
      <Table
        dataSource={open?.rooms}
        columns={columns}
        pagination={false}
        rowKey={"id"}
      />
    </CustomModal>
  );
};

export default ModalViewDetail;
