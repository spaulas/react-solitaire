import { Form, Input, Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { checkEmail, checkPassword, checkUserName } from "../helper";
import { ExplicitAny } from "../../../../global";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import React from "react";

const { Item } = Form;

interface SignUpFormProps {
  hideForm: () => void;
}

function SignUpForm({ hideForm }: SignUpFormProps) {
  const intl = useIntl();

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
        name="signUpForm"
        className="styledForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row align="middle" justify="center">
          <Item
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.userName" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkUserName(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput pwdInput"
              onChange={(e: ExplicitAny) => onChange(e, "userName")}
            />
            <label className="labelPlaceholder">username</label>
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.email" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkEmail(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput pwdInput"
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
                message: intl.formatMessage({ id: "form.required.password" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkPassword(rule, value, callback, intl)
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "password")}
            />
          </Item>
        </Row>

        <Row align="middle" justify="center">
          <Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "form.required.passwordConfirm"
                })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkPassword(rule, value, callback, intl)
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "passwordConfirm")}
            />
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.submit" />
        </MenuButton>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.signIn" />
        </MenuButton>

        <MenuButton onClick={hideForm} className="loginButtonAnimated">
          <FormattedMessage id="btn.back" />
        </MenuButton>
      </Form>
    </>
  );
}

export default SignUpForm;
