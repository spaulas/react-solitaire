import { Form, Input, Row, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { checkEmail, checkPassword, setUserRedux } from "../helper";
import { ExplicitAny } from "../../../../global";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import React from "react";
import highscoreActions from "../../../../redux/highScores/highscores.actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function LoginForm() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  const handleSignInWithGoogle = async () => {
    dispatch(userActions.clearUser());
    await signInWithGoogle()
      .then(({ user }) => {
        setUserRedux(user, dispatch);
        history.push("/");
      })
      .catch(signInError => {
        notification.error({
          message: `Login Error: ${signInError.message}`,
          duration: 5
        });

        dispatch(userActions.getLocalStorage());
        dispatch(highscoreActions.setOfflineHighScores());
      });
  };

  const onSubmit = async (values: Record<string, string>) => {
    dispatch(userActions.clearUser());
    await auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(({ user }) => {
        setUserRedux(user, dispatch);
        history.push("/");
      })
      .catch(signInError => {
        notification.error({
          message: `Login Error: ${signInError.message}`,
          duration: 5
        });

        dispatch(userActions.getLocalStorage());
        dispatch(highscoreActions.setOfflineHighScores());
      });
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

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.submit" />
        </MenuButton>
        <MenuButton location="/signUp" className="loginButtonAnimated">
          <FormattedMessage id="btn.signUp" />
        </MenuButton>
        <MenuButton
          onClick={handleSignInWithGoogle}
          className="googleButton loginButtonAnimated"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
        <MenuButton location="/" className="loginButtonAnimated">
          <FormattedMessage id="btn.back" />
        </MenuButton>
      </Form>
    </>
  );
}

export default LoginForm;
