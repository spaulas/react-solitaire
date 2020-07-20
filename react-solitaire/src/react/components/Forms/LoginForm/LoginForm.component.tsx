/* eslint-disable no-console */
import { Form, Input, Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../Buttons/MenuButton.component";
import React from "react";

const { Item } = Form;
const { Password } = Input;

interface LoginFormProps {
  hideForm: () => void;
}

function LoginForm({ hideForm }: LoginFormProps) {
  const intl = useIntl();
  const onSubmit = async (values: Record<string, string>) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
    } catch (signInError) {
      if (signInError.code === "auth/user-not-found") {
        try {
          await auth.createUserWithEmailAndPassword(
            values.email,
            values.password
          );
        } catch (signUpError) {
          console.error("Error creating user2 ", signUpError.message);
        }
      } else {
        console.error("Error creating user ", signInError.message);
      }
    }
    hideForm();
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form
        name="loginForm"
        className="styledForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row align="middle" justify="center">
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.error.email" })
              }
            ]}
          >
            <Input className="divButton loginButtonAnimated formInput" />
            <label>email</label>
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
            <Input className="divButton loginButtonAnimated formInput" />
            <label>password</label>
          </Item>
        </Row>

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
      </Form>
    </>
  );
}

export default LoginForm;
