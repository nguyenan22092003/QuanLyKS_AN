import { Col, DatePicker, Form, Input, Row, Select, Space, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import Notice from "src/components/Notice";
import { getRegexEmail, getRegexPhoneNumber } from "src/lib/stringsUtils";
import UserService from "src/services/UserService";

const ModalInsertUpdateUser = ({ onOk, open, onCancel }) => {
  const isUpdate = open.isUpdate;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
        birthDate: !!open.birthDate ? dayjs(open.birthDate) : null,
      });
    } else {
      form.setFieldsValue({});
    }
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      let res;
      if (isUpdate) {
        res = await UserService.updateUser(open.id, {
          ...values,
          birthDate: values.birthDate
            ? values.birthDate.format("YYYY-MM-DD")
            : null,
        });
      } else {
        res = await UserService.addUser({
          ...values,
          birthDate: values.birthDate
            ? values.birthDate.format("YYYY-MM-DD")
            : null,
          username: `${values.firstName} ${values.lastName}`,
        });
      }
      console.log("res: ", res);
      if (res?.status !== "success")
        return Notice({ msg: res?.message, isSuccess: false });
      onOk && onOk();
      Notice({
        msg: `${isUpdate ? "Update" : "Add"} User successful!`,
      });
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <Space size={12}>
      <Button btnType="gray" onClick={onCancel}>
        Close
      </Button>
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Space>
  );
  return (
    <CustomModal
      title={!!isUpdate ? "Update User" : "Add User"}
      footer={renderFooter()}
      width={1000}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}>
            {/* <Col md={8} xs={24}>
              <Form.Item
                label="User Name"
                required
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Enter name...",
                  },
                ]}
              >
                <Input placeholder="Enter name..." />
              </Form.Item>
            </Col> */}
            <Col md={8} xs={24}>
              <Form.Item
                label="First Name"
                required
                name="firstName"
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
            <Col md={8} xs={24}>
              <Form.Item
                label="Last Name"
                required
                name="lastName"
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
            <Col md={8} xs={24}>
              <Form.Item
                label="Citizen Identification Card"
                required
                name="citizenIdentificationCard"
                rules={[
                  {
                    required: true,
                    message: "Enter number...",
                  },
                ]}
              >
                <Input placeholder="Enter number..." />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                label="Phone Number"
                required
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Enter phone number...",
                  },
                  {
                    pattern: getRegexPhoneNumber(),
                    message: "Please enter correct phone number format!",
                  },
                ]}
              >
                <Input placeholder="Enter phone number..." />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item
                label="Email"
                required
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Enter email...",
                  },
                  {
                    pattern: getRegexEmail(),
                    message: "Please enter correct email format!",
                  },
                ]}
              >
                <Input placeholder="Enter email..." />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item label="Birth date" name="birthDate">
                <DatePicker
                  className="w-100"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  allowClear
                  disabledDate={(current) =>
                    current && current >= dayjs().startOf("day")
                  }
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="User address"
                required
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Enter address...",
                  },
                ]}
              >
                <Input.TextArea
                  size="large"
                  rows={4}
                  placeholder="Enter address..."
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
