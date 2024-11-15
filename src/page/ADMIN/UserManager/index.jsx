import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Spin, Table, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Notice from "src/components/Notice";
import UserService from "src/services/UserService";
import ModalInsertUpdateUser from "./components/ModalInsertUpdateUser";
import { UserPageStyle } from "./styled";

const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [openInsertUpdateUser, setOpenInsertUpdateUser] = useState(false);
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
      title: "Full Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (val, record) => `${val} ${record.lastName}`,
    },
    // {
    //   title: "Last Name",
    //   dataIndex: "lastName",
    //   key: "lastName",
    // },
    // {
    //   title: "User Name",
    //   dataIndex: "username",
    //   key: "username",
    // },
    {
      title: "Citizen Identification Card",
      dataIndex: "citizenIdentificationCard",
      key: "citizenIdentificationCard",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Birth date",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (val) => (val ? moment(val).format("YYYY-MM-DD") : ""),
    },
    // {
    //   title: "City",
    //   dataIndex: "city",
    //   key: "city",
    // },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (val, record) => (
        <Space size={8}>
          <Tooltip title="Edit User" mouseLeaveDelay={0}>
            <Button
              type="dashed"
              shape="circle"
              style={{ color: "#389e0d", borderColor: "#389e0d" }}
              icon={<EditOutlined />}
              size={32}
              onClick={() =>
                setOpenInsertUpdateUser({ ...record, isUpdate: true })
              }
            />
          </Tooltip>
          <Tooltip title="Delete User" mouseLeaveDelay={0}>
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

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const res = await UserService.deleteUser(id);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      Notice({ msg: "Delete user information success." });
      getListUser();
    } finally {
      setLoading(false);
    }
  };
  const getListUser = async () => {
    try {
      setLoading(true);
      const res = await UserService.getUser(conditions);
      if (res.status !== "success") return;
      setListDataTable(res.data?.responses);
      setTotal(res.data?.pagination?.totalItems || 0);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: "Are you sure to Delete this user?",
      icon: <DeleteOutlined />,
      content: `Full Name: ${record.firstName} ${record.lastName}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(record.id);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <Spin spinning={loading}>
      <UserPageStyle>
        <div className="title-page-admin d-flex justify-content-space-between">
          User Manager
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenInsertUpdateUser(true)}
          >
            Add User
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
        {openInsertUpdateUser && (
          <ModalInsertUpdateUser
            open={openInsertUpdateUser}
            onCancel={() => setOpenInsertUpdateUser(false)}
            onOk={() => {
              getListUser();
            }}
          />
        )}
      </UserPageStyle>
    </Spin>
  );
};

export default UserManager;
