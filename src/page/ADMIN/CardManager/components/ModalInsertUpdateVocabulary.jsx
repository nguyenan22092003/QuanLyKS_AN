import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Space, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import Notice from "src/components/Notice";
import FileService from "src/services/FileService";
import TopicService from "src/services/TopicService";
import VocabularyService from "src/services/VocabularyService";

const ModalInsertUpdateVocabulary = ({ onOk, open, onCancel }) => {
  const isUpdate = open.isUpdate;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
        file: open.audio
          ? [
              {
                url: open.audio,
                name: open.audio.substring(open.audio.lastIndexOf("/") + 1),
              },
            ]
          : [],
      });
    } else {
      form.resetFields();
    }
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      let audio = "";
      if (fileUpload[0]?.originFileObj) {
        const formData = new FormData();
        formData.append("file", fileUpload[0]?.originFileObj);
        const resImg = await FileService.uploadFile(formData);
        if (resImg.errorCode !== "00")
          return Notice({ msg: resImg.message, isSuccess: false });
        audio = resImg.data?.[0];
      }
      const res = await VocabularyService.insertOrUpdateVocabulary({
        ...values,
        audio,
        file: undefined,
        id: open.id || undefined,
      });
      if (res.status !== "success")
        return Notice({ msg: res.message, isSuccess: false });
      onOk && onOk();
      Notice({
        msg: `${isUpdate ? "Update" : "Add"} Vocabulary successful!`,
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
      title={!!isUpdate ? "Update Vocabulary" : "Add Vocabulary"}
      footer={renderFooter()}
      width={700}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}>
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
                label="Part"
                required
                name="part"
                rules={[
                  {
                    required: true,
                    message: "Enter part...",
                  },
                ]}
              >
                <Input placeholder="Enter part..." />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Vocabulary"
                required
                name="text"
                rules={[
                  {
                    required: true,
                    message: "Enter text...",
                  },
                ]}
              >
                <Input placeholder="Enter text..." />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Vocabulary Type"
                required
                name="textType"
                rules={[
                  {
                    required: true,
                    message: "Enter type...",
                  },
                ]}
              >
                <Input placeholder="Enter type..." />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Transcription"
                required
                name="transcription"
                rules={[
                  {
                    required: true,
                    message: "Enter transcription...",
                  },
                ]}
              >
                <Input placeholder="Enter transcription..." />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Pronounce"
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
                  () => ({
                    validator(_, value) {
                      if (!!value?.find((i) => i?.size > 5 * 1024 * 1024)) {
                        return Promise.reject(
                          new Error("Dung lượng file tối đa 5MB")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Upload
                  // accept="image/*"
                  multiple={false}
                  maxCount={1}
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

export default ModalInsertUpdateVocabulary;
