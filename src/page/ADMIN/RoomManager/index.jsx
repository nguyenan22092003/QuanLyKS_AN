import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Spin, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Notice from "src/components/Notice";
import RoomService from "src/services/RoomService";
import { RoomPageStyle } from "./styled";
import { formatMoneyVND } from "src/lib/utils";
import ModalInsertUpdateRoom from "./components/ModalInsertUpdateRoom";

const RoomManager = () => {
  const [loading, setLoading] = useState(false);
  const [openInsertUpdateRoom, setOpenInsertUpdateRoom] = useState(false);
  const [listDataTable, setListDataTable] = useState([]);
  const [total, setTotal] = useState({});
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
    {
      title: "Room status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (val, record) => (
        <Space size={8}>
          <Tooltip title="Edit Room" mouseLeaveDelay={0}>
            <Button
              type="dashed"
              shape="circle"
              style={{ color: "#389e0d", borderColor: "#389e0d" }}
              icon={<EditOutlined />}
              size={32}
              onClick={() =>
                setOpenInsertUpdateRoom({ ...record, isUpdate: true })
              }
            />
          </Tooltip>
          <Tooltip title="Delete Room" mouseLeaveDelay={0}>
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
        </Space>
      ),
    },
  ];

  const deleteRoom = async (id) => {
    try {
      setLoading(true);
      const res = await RoomService.deleteRoom(id);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      Notice({ msg: "Delete room information success." });
      getListRoom();
    } finally {
      setLoading(false);
    }
  };
  const getListRoom = async () => {
    try {
      setLoading(true);
      const res = await RoomService.getRoom(conditions);
      if (res.status !== "success") return;
      setListDataTable(res.data?.responses);
      setTotal(res.data?.pagination?.totalItems || 0);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: "Are you sure to Delete this room?",
      icon: <DeleteOutlined />,
      content: `Room Name: ${record.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteRoom(record.id);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getListRoom();
  }, []);

  return (
    <Spin spinning={loading}>
      <RoomPageStyle>
        <div className="title-page-admin d-flex justify-content-space-between">
          Room Manager
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenInsertUpdateRoom(true)}
          >
            Add Room
          </Button>
        </div>
        <Space size={8} className="mb-16"></Space>
        <Table
          dataSource={listDataTable}
          columns={columns}
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
        {openInsertUpdateRoom && (
          <ModalInsertUpdateRoom
            open={openInsertUpdateRoom}
            onCancel={() => setOpenInsertUpdateRoom(false)}
            onOk={() => {
              getListRoom();
            }}
          />
        )}
      </RoomPageStyle>
    </Spin>
  );
};

export default RoomManager;
