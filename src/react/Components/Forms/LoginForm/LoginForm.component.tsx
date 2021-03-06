import { ExplicitAny, RootReducerState } from "../../../../global";
import { Form, Input, Row, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { checkEmail, setUserRedux } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { GoogleCircleFilled } from "@ant-design/icons";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import React from "react";
import highscoreActions from "../../../../redux/highScores/highscores.actions";
import { useHistory } from "react-router-dom";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function LoginForm() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const { language } = useSelector(({ User }: RootReducerState) => ({
    language: User.user?.settings?.language
  }));

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
        setUserRedux(user, dispatch, false, undefined, language);
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
            <label className="labelPlaceholder">
              <FormattedMessage id="table.email" />
            </label>
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.password" })
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "password")}
              onPressEnter={() => form.submit()}
              confirmPwd={false}
            />
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated formButton"
        >
          <span>
            <FormattedMessage id="btn.submit" />
          </span>
        </MenuButton>
        <MenuButton
          location="/signUp"
          className="loginButtonAnimated formButton"
        >
          <span>
            <FormattedMessage id="btn.signUp" />
          </span>
        </MenuButton>
        <MenuButton
          onClick={handleSignInWithGoogle}
          className="googleButton loginButtonAnimated formButton"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
        <MenuButton location="/" className="loginButtonAnimated formButton">
          <span>
            <FormattedMessage id="btn.back" />
          </span>
        </MenuButton>
      </Form>
    </>
  );
}

export default LoginForm;
