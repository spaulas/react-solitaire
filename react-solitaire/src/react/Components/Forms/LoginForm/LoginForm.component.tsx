import { Form, Input, Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { ExplicitAny } from "../../../../global";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../Buttons/MenuButton.component";

const { Item } = Form;
// const { Password } = Input;

interface LoginFormProps {
  hideForm: () => void;
}

function LoginForm({ hideForm }: LoginFormProps) {
  const intl = useIntl();
  const [inputRef, setInputRef] = useState<ExplicitAny>();

  useEffect(() => inputRef?.focus(), [inputRef]);

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

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
            <Input
              ref={(e: ExplicitAny) => setInputRef(e)}
              className="divButton loginButtonAnimated formInput"
              onChange={(e: ExplicitAny) => onChange(e, "email")}
            />
            <label className="labelPlaceholder">email</label>
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
            <Input
              className="divButton loginButtonAnimated formInput"
              onChange={(e: ExplicitAny) => onChange(e, "password")}
            />
            <label className="labelPlaceholder">password</label>
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.submit" />
        </MenuButton>
        <MenuButton
          onClick={signInWithGoogle}
          className="googleButton loginButtonAnimated"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
        <MenuButton onClick={hideForm} className="loginButtonAnimated">
          <FormattedMessage id="btn.back" />
        </MenuButton>
      </Form>
    </>
  );
}

export default LoginForm;
