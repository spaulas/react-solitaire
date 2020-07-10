/* eslint-disable no-console */
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Form, Input, Row } from "antd";
import MenuButton from "../../components/Buttons/MenuButton.component";
import React from "react";

const { Item } = Form;
const { Password } = Input;

interface LoginFormProps {
  hideForm: () => void;
}

function LoginForm({ hideForm }: LoginFormProps) {
  const onSubmit = (values: Record<string, string>) => {
    console.log("onSubmit values = ", values);
    hideForm();
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form name="loginForm" onFinish={onSubmit} form={form}>
        <Row align="middle" justify="center">
          <Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="divButton loginButtonAnimated" />
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Password className="divButton passwordInput loginButtonAnimated" />
          </Item>
        </Row>
      </Form>

      <Row align="middle" justify="center">
        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <span>Submit</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          onClick={() => form.submit()}
          className="googleButton loginButtonAnimated"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
      </Row>

      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          onClick={() => form.submit()}
          className="facebookButton loginButtonAnimated"
        >
          <FacebookFilled />
          <span> Facebook</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton onClick={hideForm} className="loginButtonAnimated">
          <span>Back</span>
        </MenuButton>
      </Row>
    </>
  );
}

export default LoginForm;
