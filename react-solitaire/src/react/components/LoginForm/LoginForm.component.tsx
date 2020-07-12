/* eslint-disable no-console */
import { Form, Input, Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../components/Buttons/MenuButton.component";
import React from "react";
import { signInWithGoogle } from "../../../firebase/firebase.utils";

const { Item } = Form;
const { Password } = Input;

interface LoginFormProps {
  hideForm: () => void;
}

function LoginForm({ hideForm }: LoginFormProps) {
  const intl = useIntl();
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
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.error.email" })
              }
            ]}
          >
            <Input className="divButton loginButtonAnimated" />
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.error.password" })
              }
            ]}
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
          <FormattedMessage id="btn.submit" />
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          onClick={signInWithGoogle}
          className="googleButton loginButtonAnimated"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton onClick={hideForm} className="loginButtonAnimated">
          <FormattedMessage id="btn.back" />
        </MenuButton>
      </Row>
    </>
  );
}

export default LoginForm;
