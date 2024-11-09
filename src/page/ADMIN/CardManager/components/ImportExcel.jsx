import { UploadOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Space, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import Notice from "src/components/Notice";
import FileService from "src/services/FileService";
import TopicService from "src/services/TopicService";
import VocabularyService from "src/services/VocabularyService";

const ImportExcel = ({ onOk, open, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileExcel, setFileExcel] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const getListTopic = async () => {
    try {
      setLoading(true);
      const res = await TopicService.searchTopic({
        pageSize: 10000,
        currentPage: 1,
      });
      if (res.status !== "success") return;
      setListTopic(res.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListTopic();
    form.resetFields();
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", values.file[0]?.originFileObj);
      formData.append("topicId", values.topicId);
      const res = await VocabularyService.importExcelVocabulary(formData);
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      const formData2 = new FormData();
      values.fileAudio.forEach((i) =>
        formData2.append("file", i?.originFileObj)
      );
      const resAudio = await FileService.uploadFile(formData);
      if (resAudio.errorCode !== "00")
        return Notice({ msg: resAudio.message, isSuccess: false });
      onOk && onOk();
      Notice({
        msg: `Import Vocabulary successful!`,
      });
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <Space size={12}>
      <Button btnType="gray" onClick={onCancel}>
        Đóng
      </Button>
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Space>
  );
  return (
    <CustomModal
      title={"Import Vocabulary"}
      footer={renderFooter()}
      width={500}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}>
            <Col span={24}>
              <div
                className="link-download mb-12 ml-6 fs-16 fw-600 pointer"
                style={{
                  color: "var(--color-primary-admin)",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  window.open(
                    "http://vocabulary.demozone.click/api/files/download/FileImport.xlsx"
                  )
                }
              >
                Click to download file template!
              </div>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Topic"
                required
                name="topicId"
                rules={[
                  {
                    required: true,
                    message: "Select topic...",
                  },
                ]}
              >
                <Select placeholder="Select topic">
                  {listTopic.map((i) => (
                    <Select.Option value={i.id}>{i.title}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="File Excel"
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
                rules={[
                  {
                    required: true,
                    message: "Upload file...",
                  },
                  // () => ({
                  //   validator(_, value) {
                  //     if (!!value?.find((i) => i?.size > 5 * 1024 * 1024)) {
                  //       return Promise.reject(
                  //         new Error("Dung lượng file tối đa 5MB")
                  //       );
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // }),
                ]}
              >
                <Upload
                  accept=".xlsx, .xls"
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  // listType="picture-card"
                  fileList={fileExcel}
                  onChange={({ file, fileList }) => {
                    setFileExcel(fileList);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Pronounce"
                name="fileAudio"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
                rules={[
                  {
                    required: true,
                    message: "Upload file...",
                  },
                  // () => ({
                  //   validator(_, value) {
                  //     if (!!value?.find((i) => i?.size > 5 * 1024 * 1024)) {
                  //       return Promise.reject(
                  //         new Error("Dung lượng file tối đa 5MB")
                  //       );
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // }),
                ]}
              >
                <Upload
                  // accept="image/*"
                  multiple={true}
                  beforeUpload={() => false}
                  // listType="picture-card"
                  fileList={fileUpload}
                  onChange={({ file, fileList }) => {
                    setFileUpload(fileList);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  );
};

export default ImportExcel;
