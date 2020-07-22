/* eslint-disable no-console */
import { ExplicitAny, RootReducerState } from "../../../../global";
import { Form, Input, Row, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { auth, getUserInfo } from "../../../../firebase/firebase.utils";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUserName
} from "../helper";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import { useHistory } from "react-router-dom";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function SignUpForm() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [finalUserName, setFinalUserName] = useState<string | undefined>(
    undefined
  );

  const { userRef } = useSelector(({ User }: RootReducerState) => ({
    userRef: User.userRef
  }));

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  const onSubmit = async (values: Record<string, string>) => {
    setFinalUserName(values.userName);
    try {
      console.log("value s = ", values);
      await auth.createUserWithEmailAndPassword(values.email, values.password);
      getUserInfo(values.userName);
    } catch (signUpError) {
      notification.error({
        message: `Sign Up Error: ${signUpError.message}`,
        duration: 5
      });
    }
  };

  /* const handleUserSignedUp = () => {
    console.log("handleUserSignedUp userRef - ", userRef);
    console.log("handleUserSignedUp finalUserName - ", finalUserName);
    if (userRef && finalUserName) {
      console.log("username = ", form.getFieldValue("userName"));
      dispatch(
        userActions.changeUserSettings({
          userName: finalUserName
        })
      );
      history.push("/");
    }
  };
  useEffect(handleUserSignedUp, [userRef, finalUserName]); */

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
