import { Col, Form, Input, InputNumber, Row, Select, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import Notice from "src/components/Notice";
import RoomService from "src/services/RoomService";

const ModalInsertUpdateUser = ({ onOk, open, onCancel }) => {
  const isUpdate = open.isUpdate;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
      });
    } else {
      form.setFieldsValue({
        status: "AVAILABLE",
      });
    }
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      let res;
      if (isUpdate) {
        res = await RoomService.updateRoom(open.id, {
          ...values,
        });
      } else {
        res = await RoomService.addRoom({
          ...values,
        });
      }
      console.log("res: ", res);
      if (res?.status !== "success")
        return Notice({ msg: res?.message, isSuccess: false });
      onOk && onOk();
      Notice({
        msg: `${isUpdate ? "Update" : "Add"} Room successful!`,
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
      title={!!isUpdate ? "Update Room" : "Add Room"}
      footer={renderFooter()}
      width={600}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}>
            <Col md={24} xs={24}>
              <Form.Item
                label="Room Name"
                required
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Enter name...",
                  },
                ]}
              >
                <Input placeholder="Enter name..." />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Number people"
                required
                name="numberPeople"
                rules={[
                  {
                    required: true,
                    message: "Enter number people...",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  min={1}
                  max={100}
                  placeholder="Enter number people..."
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Price"
                required
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Enter price...",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  placeholder="Enter price..."
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Room status"
                required
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Enter name...",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="AVAILABLE">AVAILABLE</Select.Option>
                  <Select.Option value="UNAVAILABLE">UNAVAILABLE</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Room Description"
                required
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Enter description...",
                  },
                ]}
              >
                <Input.TextArea
                  size="large"
                  rows={4}
                  placeholder="Enter description..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  );
};

export default ModalInsertUpdateUser;
