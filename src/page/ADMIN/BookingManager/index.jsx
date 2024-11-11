import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileDoneOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Spin, Table, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Notice from "src/components/Notice";
import BookingService from "src/services/BookingService";
import ModalInsertUpdateBooking from "./components/ModalInsertUpdateBooking";
import { BookingPageStyle } from "./styled";
import ModalViewDetail from "./components/ModalViewDetail";
import { FaCcAmazonPay } from "react-icons/fa";

const BookingManager = () => {
  const [loading, setLoading] = useState(false);
  const [openInsertUpdateBooking, setOpenInsertUpdateBooking] = useState(false);
  const [listDataTable, setListDataTable] = useState([]);
  const [total, setTotal] = useState({});
  const [viewDetail, setViewDetail] = useState(false);
  const [conditions, setConditions] = useState({
    limit: 20,
    page: 1,
  });

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      align: "center",
      width: 60,
      render: (val, record, index) =>
        index + 1 + conditions.limit * (conditions.page - 1),
    },
    {
      title: "Booker",
      dataIndex: "booker",
      key: "booker",
      render: (val, record) =>
        `${record?.account?.firstName} ${record?.account?.lastName}`,
    },
    {
      title: "Booker's phone number",
      dataIndex: "numberPeople",
      key: "numberPeople",
      render: (val, record) => record?.account?.phoneNumber,
    },
    {
      title: "Number of People",
      dataIndex: "numberPeople",
      key: "numberPeople",
    },
    {
      title: "Number of Rooms Booked",
      dataIndex: "numberRoom",
      key: "numberRoom",
      render: (val, record) => record?.rooms?.length || 0,
    },
    {
      title: "Check-in Date",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      render: (val) => (val ? moment(val).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Check-out Date",
      dataIndex: "departureDate",
      key: "departureDate",
      render: (val) => (val ? moment(val).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Status booking",
      dataIndex: "status_booking",
      key: "status_booking",
    },
    {
      title: "Status payment",
      dataIndex: "status_payment",
      key: "status_payment",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (val, record) => (
        <Space size={8}>
          <Tooltip title="View Detail" mouseLeaveDelay={0}>
            <Button
              type="dashed"
              shape="circle"
              danger
              style={{ color: "#0f51a2", borderColor: "#0f51a2" }}
              icon={<EyeOutlined />}
              size={32}
              onClick={() => setViewDetail(record)}
            />
          </Tooltip>
          {record.status_booking !== "WAITING" &&
            record.status_payment === "UNPAID" && (
              <Tooltip title="Payment" mouseLeaveDelay={0}>
                <Button
                  type="dashed"
                  shape="circle"
                  style={{ color: "#0f51a2", borderColor: "#0f51a2" }}
                  icon={<FaCcAmazonPay />}
                  size={32}
                  onClick={() => {
                    confirmPaid(record);
                  }}
                />
              </Tooltip>
            )}
          {record.status_booking === "CONFIRMED" && (
            <Tooltip title="Done" mouseLeaveDelay={0}>
              <Button
                type="dashed"
                shape="circle"
                style={{ color: "#389e0d", borderColor: "#389e0d" }}
                icon={<FileDoneOutlined />}
                size={32}
                onClick={() => {
                  completeBooking(record);
                }}
              />
            </Tooltip>
          )}
          {record.status_booking === "WAITING" && (
            <>
              <Tooltip title="Confirm" mouseLeaveDelay={0}>
                <Button
                  type="dashed"
                  shape="circle"
                  style={{ color: "#389e0d", borderColor: "#389e0d" }}
                  icon={<CheckOutlined />}
                  size={32}
                  onClick={() => {
                    confirmBooking(record);
                  }}
                />
              </Tooltip>
              <Tooltip title="Cancel" mouseLeaveDelay={0}>
                <Button
                  type="dashed"
                  shape="circle"
                  danger
                  style={{ color: "#cf1322" }}
                  icon={<CloseOutlined />}
                  size={32}
                  onClick={() => {
                    cancelBooking(record);
                  }}
                />
              </Tooltip>
              <Tooltip title="Edit Booking" mouseLeaveDelay={0}>
                <Button
                  type="dashed"
                  shape="circle"
                  style={{ color: "#389e0d", borderColor: "#389e0d" }}
                  icon={<EditOutlined />}
                  size={32}
                  onClick={() =>
                    setOpenInsertUpdateBooking({ ...record, isUpdate: true })
                  }
                />
              </Tooltip>
              <Tooltip title="Delete Booking" mouseLeaveDelay={0}>
                <Button
                  type="dashed"
                  shape="circle"
                  danger
                  style={{ color: "#cf1322" }}
                  icon={<DeleteOutlined />}
                  size={32}
                  onClick={() => showDeleteConfirm(record)}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  const deleteBooking = async (id) => {
    try {
      setLoading(true);
      const res = await BookingService.deleteBooking(id);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      Notice({ msg: "Delete booking information success." });
      getListBooking();
      setViewDetail(false);
    } finally {
      setLoading(false);
    }
  };
  const getListBooking = async () => {
    try {
      setLoading(true);
      const res = await BookingService.getBooking(conditions);
      if (res.status !== "success") return;
      setListDataTable(res.data?.responses);
      setTotal(res.data?.pagination?.totalItems || 0);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: "Are you sure to Delete this booking?",
      icon: <DeleteOutlined />,
      content: `Booker Name: ${record?.account?.firstName} ${record?.account?.lastName}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteBooking(record.id);
      },
      onCancel() {},
    });
  };

  const confirmBooking = (record) => {
    Modal.confirm({
      title: "Are you sure you want to confirm this booking?",
      icon: <CheckOutlined style={{ color: "#389e0d" }} />,
      content: `Booker Name: ${record?.account?.firstName} ${record?.account?.lastName}`,
      width: 600,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        changeStatusBooking("CONFIRMED", record);
      },
      onCancel() {},
    });
  };
  const cancelBooking = (record) => {
    Modal.confirm({
      title: "Are you sure you want to cancel this booking?",
      icon: <CloseOutlined style={{ color: "#cf1322" }} />,
      content: `Booker Name: ${record?.account?.firstName} ${record?.account?.lastName}`,
      width: 600,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        changeStatusBooking("CANCELLED", record);
      },
      onCancel() {},
    });
  };
  const completeBooking = (record) => {
    Modal.confirm({
      title: "Are you sure you want to complete this booking?",
      icon: <FileDoneOutlined style={{ color: "#389e0d" }} />,
      content: `Booker Name: ${record?.account?.firstName} ${record?.account?.lastName}`,
      width: 600,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        changeStatusBooking("COMPLETED", record);
      },
      onCancel() {},
    });
  };
  const confirmPaid = (record) => {
    Modal.confirm({
      title: "Are you sure you want to confirm that this booking had paid?",
      icon: (
        <FaCcAmazonPay style={{ color: "#0f51a2" }} className="mt-4 mr-12" />
      ),
      content: `Booker Name: ${record?.account?.firstName} ${record?.account?.lastName}`,
      width: 600,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        changeStatusBooking("PAYMENT", record);
      },
      onCancel() {},
    });
  };
  const changeStatusBooking = async (type, item) => {
    try {
      const apis = {
        CONFIRMED: "confirmBooking",
        CANCELLED: "cancelBooking",
        COMPLETED: "completeBooking",
        PAYMENT: "paymentBooking",
      };
      setLoading(true);
      const res = await BookingService[apis[type]](item.id);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      Notice({ msg: "Change status success." });
      setViewDetail(false);
      getListBooking();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListBooking();
  }, []);

  return (
    <Spin spinning={loading}>
      <BookingPageStyle>
        <div className="title-page-admin d-flex justify-content-space-between">
          Booking Manager
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenInsertUpdateBooking(true)}
          >
            Add Booking
          </Button>
        </div>
        <Table
          dataSource={listDataTable}
          columns={columns}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       setViewDetail(record);
          //     },
          //   };
          // }}
          pagination={{
            hideOnSinglePage: true,
            current: conditions?.page,
            pageSize: conditions?.limit,
            responsive: true,
            total: total,
            showSizeChanger: total > 10,
            onChange: (page, pageSize) => {
              let currentPage = page;
              if (pageSize !== conditions.limit) {
                currentPage = 1;
              }
              setConditions({
                ...conditions,
                page: currentPage,
                limit: pageSize,
              });
            },
          }}
          rowKey={"id"}
          // loading={loading}
        />
        {openInsertUpdateBooking && (
          <ModalInsertUpdateBooking
            open={openInsertUpdateBooking}
            onCancel={() => setOpenInsertUpdateBooking(false)}
            onOk={() => {
              getListBooking();
              setViewDetail(false);
            }}
          />
        )}
        {viewDetail && (
          <ModalViewDetail
            open={viewDetail}
            onCancel={() => setViewDetail(false)}
            confirmBooking={() => confirmBooking(viewDetail)}
            cancelBooking={() => cancelBooking(viewDetail)}
            completeBooking={() => completeBooking(viewDetail)}
            confirmPaid={() => confirmPaid(viewDetail)}
            updateBooking={() =>
              setOpenInsertUpdateBooking({ ...viewDetail, isUpdate: true })
            }
            deleteBooking={() => showDeleteConfirm(viewDetail)}
          />
        )}
      </BookingPageStyle>
    </Spin>
  );
};

export default BookingManager;
