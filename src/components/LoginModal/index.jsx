import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Notice from "src/components/Notice";
import STORAGE, { setStorage } from "src/lib/storage";
import { setListCart, setUserInfo } from "src/redux/appGlobal";
import AuthService from "src/services/AuthService";
import CartService from "src/services/CartService";
import FlInput from "../FloatingLabel/Input";
import { ModalLoginStyle, StyleLoginModal } from "./styled";

const LoginModal = ({
  open,
  onCancel,
  handleRegister,
  setOpenForgetPassModal,
  stopNavigate = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getListCart = async (user_id) => {
    try {
      setLoading(true);
      const res = await CartService.getListCart(user_id);
      dispatch(setListCart(res.data || []));
    } finally {
      setLoading(false);
    }
  };
  const onLogin = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res = await AuthService.login({
        ...values,
      });
      if (res?.errorCode !== "00")
        return Notice({
          msg: res.message,
          isSuccess: false,
        });
      Notice({
        msg: `Login successful!`,
      });
      const data = res?.data;
      setStorage(STORAGE.TOKEN, data?.sessionId);
      setStorage(STORAGE.SESSION, data?.sessionId);
      setStorage(STORAGE.USER_INFO, data);
      dispatch(setUserInfo(data));
      // getListCart(data.id);
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLoginStyle
      title={false}
      width={500}
      footer={null}
      open={open}
      onCancel={onCancel}
      style={{ top: 20 }}
    >
      <StyleLoginModal>
        <div className="text-center mb-40">
          <div className="fs-22 fw-600 title-popup">
            Chào mừng đến với chúng tôi!
          </div>
        </div>
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "input username!",
                },
              ]}
              name="username"
              label="User name"
            >
              <Input placeholder="input name..." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "input password!",
                },
              ]}
              name="password"
              label="Password"
            >
              <Input.Password placeholder="input password..." />
            </Form.Item>
            {/* <Row className="d-flex justify-content-space-between align-items-center mb-6">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
              ></Form.Item>
              <Link
                onClick={() => {
                  setOpenForgetPassModal();
                  onCancel();
                }}
                className="forget-pass mb-0"
              >
                <i>Quên mật khẩu?</i>
              </Link>
            </Row> */}
            <Button
              loading={loading}
              // btnType="orange-third"
              className="btn-login mt-16"
              type="submit"
              htmlType="submit"
              onClick={onLogin}
            >
              Đăng nhập
            </Button>
          </Form>
          {/* <Divider plain className="mv-12">
            Hoặc
          </Divider>
          <Row gutter={16}>
                <Col span={12}>
                  <Button className="box" onClick={loginFB} disabled={loading}>
                    <div className="d-flex align-items-center">
                      <SvgIcon name="login-facebook" />
                      <div className="ml-16 fs-16">Facebook</div>
                    </div>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className="box" onClick={loginGG} disabled={loading}>
                    <div className="d-flex align-items-center">
                      <SvgIcon name="login-google" />
                      <div className="ml-16 fs-16">Google</div>
                    </div>
                  </Button>
                </Col>
              </Row>
          <div className="mt-16 text-center">
            Bạn chưa có tài khoản?{" "}
            <i
              style={{ color: "rgb(36 118 226)" }}
              className="pointer"
              onClick={() => {
                onCancel();
                handleRegister();
              }}
            >
              Đăng ký
            </i>
          </div> */}
        </div>
      </StyleLoginModal>
    </ModalLoginStyle>
  );
};

export default LoginModal;
