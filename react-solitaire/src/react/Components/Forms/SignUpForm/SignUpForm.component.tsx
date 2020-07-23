import { Form, Input, Row, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUserName,
  setUserRedux
} from "../helper";
import { ExplicitAny } from "../../../../global";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import React from "react";
import { auth } from "../../../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { Item } = Form;

function SignUpForm() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  const onSubmit = async (values: Record<string, string>) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      setUserRedux(user, dispatch, values.userName);
      history.push("/");
    } catch (signUpError) {
      notification.error({
        message: `Sign Up Error: ${signUpError.message}`,
        duration: 5
      });
    }
  };

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
              onPressEnter={() => form.submit()}
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
              onPressEnter={() => form.submit()}
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
              onPressEnter={() => form.submit()}
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
                ) =>
                  checkConfirmPassword(
                    rule,
                    value,
                    callback,
                    form.getFieldValue("password"),
                    intl
                  )
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "passwordConfirm")}
              onPressEnter={() => form.submit()}
            />
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.submit" />
        </MenuButton>

        <MenuButton location="/login" className="loginButtonAnimated">
          <FormattedMessage id="btn.login" />
        </MenuButton>
      </Form>
    </>
  );
}

export default SignUpForm;
