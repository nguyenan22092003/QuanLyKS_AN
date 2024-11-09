import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Notice from "src/components/Notice";
import VocabularyService from "src/services/VocabularyService";
import ModalInsertUpdateVocabulary from "./components/ModalInsertUpdateVocabulary";
import ImportExcel from "./components/ImportExcel";
import { VocabularyPageStyle } from "./styled";

const CardManager = () => {
  const [loading, setLoading] = useState(false);
  const [openInsertUpdateVocabulary, setOpenInsertUpdateVocabulary] =
    useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [listDataTable, setListDataTable] = useState([]);
  const [conditions, setConditions] = useState({
    pageSize: 10000,
    currentPage: 1,
  });

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      align: "center",
      width: 60,
      render: (val, record, index) =>
        index + 1 + conditions.pageSize * (conditions.currentPage - 1),
    },
    {
      title: "Topic",
      dataIndex: "topicTitle",
      key: "topicTitle",
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Vocabulary",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Vocabulary Type",
      dataIndex: "textType",
      key: "textType",
    },
    {
      title: "Transcription",
      dataIndex: "transcription",
      key: "transcription",
    },
    {
      title: "Audio",
      dataIndex: "audio",
      key: "audio",
      render: (val) => (val ? val.substring(val.lastIndexOf("/") + 1) : ""),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (val, record) => (
        <Space size={8}>
          <Tooltip title="Edit Vocabulary" mouseLeaveDelay={0}>
            <Button
              type="dashed"
              shape="circle"
              style={{ color: "#389e0d", borderColor: "#389e0d" }}
              icon={<EditOutlined />}
              size={32}
              onClick={() =>
                setOpenInsertUpdateVocabulary({ ...record, isUpdate: true })
              }
            />
          </Tooltip>
          <Tooltip title="Delete Vocabulary" mouseLeaveDelay={0}>
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

  const getListVocabulary = async () => {
    try {
      setLoading(true);
      const res = await VocabularyService.searchVocabulary(conditions);
      if (res.status !== "success") return;
      setListDataTable(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteVocabulary = async (id) => {
    try {
      setLoading(true);
      const res = await VocabularyService.deleteVocabulary(id);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      Notice({ msg: "Delete vocabulary success." });
      getListVocabulary();
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: "Are you sure to Delete this vocabulary?",
      icon: <DeleteOutlined />,
      content: `Vocabulary: ${record.text}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteVocabulary(record.id);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getListVocabulary();
  }, []);

  return (
    // <Spin spinning={loading}>
    <VocabularyPageStyle>
      <div className="title-page-admin d-flex justify-content-space-between">
        Vocabulary Manager
        <Space size={12}>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenInsertUpdateVocabulary(true)}
          >
            Add Vocabulary
          </Button>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => setOpenImport(true)}
          >
            Import File
          </Button>
        </Space>
      </div>
      <Space size={8} className="mb-16"></Space>
      <Table
        dataSource={listDataTable}
        columns={columns}
        pagination={false}
        rowKey={"id"}
        loading={loading}
      />
      {openInsertUpdateVocabulary && (
        <ModalInsertUpdateVocabulary
          open={openInsertUpdateVocabulary}
          onCancel={() => setOpenInsertUpdateVocabulary(false)}
          onOk={() => {
            getListVocabulary();
          }}
        />
      )}
      {openImport && (
        <ImportExcel
          open={openImport}
          onCancel={() => setOpenImport(false)}
          onOk={() => {
            getListVocabulary();
          }}
        />
      )}
    </VocabularyPageStyle>
    // </Spin>
  );
};

export default CardManager;
