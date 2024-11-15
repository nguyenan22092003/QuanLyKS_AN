import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CustomModal from "src/components/CustomModal";
import Button from "src/components/MyButton/Button";
import Notice from "src/components/Notice";
import { formatMoneyVND } from "src/lib/utils";
import BookingService from "src/services/BookingService";
import RoomService from "src/services/RoomService";
import UserService from "src/services/UserService";

const ModalInsertUpdateBooking = ({ onOk, open, onCancel }) => {
  const isUpdate = open.isUpdate;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listRoom, setListRoom] = useState([]);

  const getListUser = async () => {
    try {
      setLoading(true);
      const res = await UserService.getUser();
      if (res.status !== "success") return;
      setListUser(res.data?.responses);
    } finally {
      setLoading(false);
    }
  };
  const getListRoom = async () => {
    try {
      setLoading(true);
      const res = await RoomService.getRoomByDate();
      if (res.status !== "success") return;
      setListRoom(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListUser();
    getListRoom();
    if (isUpdate) {
      form.setFieldsValue({
        ...open,
        accountId: open?.account?.id,
        roomIds: open?.rooms?.map((i) => i.id),
        arrivalDate: !!open.arrivalDate ? dayjs(open.arrivalDate) : null,
        departureDate: !!open.departureDate ? dayjs(open.departureDate) : null,
      });
    } else {
      form.setFieldsValue({
        status: "PENDING",
      });
    }
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      let res;
      if (isUpdate) {
        res = await BookingService.updateBooking(open.id, {
          ...values,
          arrivalDate: values.arrivalDate
            ? values.arrivalDate.format("YYYY-MM-DD")
            : null,
          departureDate: values.departureDate
            ? values.departureDate.format("YYYY-MM-DD")
            : null,
        });
      } else {
        res = await BookingService.addBooking({
          ...values,
          arrivalDate: values.arrivalDate
            ? values.arrivalDate.format("YYYY-MM-DD")
            : null,
          departureDate: values.departureDate
            ? values.departureDate.format("YYYY-MM-DD")
            : null,
        });
      }
      if (res?.status !== "success")
        return Notice({ msg: res?.message, isSuccess: false });
      onOk && onOk();
      Notice({
        msg: `${isUpdate ? "Update" : "Add"} Booking successful!`,
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
      title={!!isUpdate ? "Update Booking" : "Add Booking"}
      footer={renderFooter()}
      width={700}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Booker"
                required
                name="accountId"
                rules={[
                  {
                    required: true,
                    message: "Select booker...",
                  },
                ]}
              >
                <Select
                  placeholder="Select booker"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listUser?.map((i, idx) => (
                    <Select.Option
                      value={i.id}
                    >{`${i.firstName} ${i.lastName} (${i.phoneNumber})`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Number of People"
                required
                name="numberPeople"
                rules={[
                  {
                    required: true,
                    message: "Enter number...",
                  },
                ]}
              >
                <InputNumber placeholder="Enter number..." className="w-100" />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Rooms"
                required
                name="roomIds"
                rules={[
                  {
                    required: true,
                    message: "Select booker...",
                  },
                ]}
              >
                <Select
                  placeholder="Select booker"
                  mode="multiple"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listRoom?.map((i, idx) => (
                    <Select.Option value={i.id}>{`${i.name} (${
                      i.numberPeople
                    } - ${formatMoneyVND(+i.price)})`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Check-in Date"
                name="arrivalDate"
                rules={[
                  {
                    required: true,
                    message: "Select date...",
                  },
                ]}
              >
                <DatePicker
                  className="w-100"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  allowClear
                  // disabledDate={(current) =>
                  //   current && current >= dayjs().startOf("day")
                  // }
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Check-out Date"
                name="departureDate"
                rules={[
                  {
                    required: true,
                    message: "Select date...",
                  },
                ]}
              >
                <DatePicker
                  className="w-100"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  allowClear
                  // disabledDate={(current) =>
                  //   current && current >= dayjs().startOf("day")
                  // }
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Description"
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

export default ModalInsertUpdateBooking;
