import { Checkbox, Col, Divider, Form, Input, Radio, Row, Tooltip } from "antd";
import { ExplicitAny, RootReducerState } from "../../../global";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/Buttons/MenuButton.component";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import ReactCountryFlag from "react-country-flag";
import moment from "moment";
import { useForm } from "antd/lib/form/util";
import userActions from "../../../redux/user/user.actions";

const { Item } = Form;

function ConfigurationsPage() {
  const [form] = useForm();
  const intl = useIntl();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const {
    userName,
    email,
    createdAt,
    language,
    joyride,
    loggedOut
  } = useSelector(({ User }: RootReducerState) => {
    const user = User.user;
    return {
      userName: user.userName,
      email: user.email,
      createdAt: moment(user.createdAt).format("DD/MM/YYYY, hh:mm"),
      language: user.settings.language,
      joyride: user.settings.joyride,
      loggedOut: User.userRef === false
    };
  });

  const onSubmit = ({
    userName,
    language,
    createdAt,
    email,
    ...joyride
  }: ExplicitAny) => {
    const finalChanges = {
      userName,
      settings: {
        language,
        joyride
      }
    };
    dispatch(userActions.changeUserSettings(finalChanges));
    setEditMode(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditMode(false);
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
  };

  return (
    <div className="joyrideStartingPage startingPage">
      <PageTitle title={<FormattedMessage id="sidebar.configurations" />} />
      <Form
        className="configurationsForm"
        initialValues={{ userName, email, createdAt, language, ...joyride }}
        name="configurationsForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <Col>
            <Item
              label={<FormattedMessage id="table.userName" />}
              name="userName"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: "form.error.userName" })
                }
              ]}
              {...formItemLayout}
            >
              <Input
                disabled={!editMode}
                className="divButton loginButtonAnimated"
              />
            </Item>
          </Col>
          <Col>
            <Item
              label={<FormattedMessage id="table.createdAt" />}
              name="createdAt"
              {...formItemLayout}
            >
              <Input disabled className="divButton loginButtonAnimated" />
            </Item>
          </Col>
        </Row>

        <Row className="buttonSpaceRow" align="middle" justify="center">
          {!loggedOut ? (
            <Col>
              <Item
                label={<FormattedMessage id="table.email" />}
                name="email"
                {...formItemLayout}
              >
                <Input disabled className="divButton loginButtonAnimated" />
              </Item>
            </Col>
          ) : null}

          <Col>
            <Item
              label={<FormattedMessage id="languages.title" />}
              name="language"
              {...formItemLayout}
            >
              <Radio.Group className="languagesRadioGroup" disabled={!editMode}>
                <Radio.Button className="flagRadioButton" value="en-US">
                  <Tooltip title={<FormattedMessage id="languages.english" />}>
                    <ReactCountryFlag className="flags" countryCode="GB" />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button className="flagRadioButton" value="pt-PT">
                  <Tooltip
                    title={<FormattedMessage id="languages.portuguese" />}
                  >
                    <ReactCountryFlag className="flags" countryCode="BR" />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button className="flagRadioButton" value="de-DE">
                  <Tooltip title={<FormattedMessage id="languages.german" />}>
                    <ReactCountryFlag className="flags" countryCode="DE" />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button className="flagRadioButton" value="es-ES">
                  <Tooltip title={<FormattedMessage id="languages.spanish" />}>
                    <ReactCountryFlag className="flags" countryCode="ES" />
                  </Tooltip>
                </Radio.Button>
              </Radio.Group>
            </Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <FormattedMessage id="joyride.title" />
        </Divider>

        <Row className="buttonSpaceRow" align="middle" justify="center">
          {Object.keys(joyride).map((page: string) => (
            <Col key={page}>
              <Item name={page} valuePropName="checked">
                <Checkbox disabled={!editMode} defaultChecked={joyride[page]}>
                  <FormattedMessage id={`sidebar.${page}`} />
                </Checkbox>
              </Item>
            </Col>
          ))}
        </Row>
      </Form>
      {editMode ? (
        <>
          <Row className="buttonSpaceRow" align="middle" justify="center">
            <MenuButton
              onClick={() => form.submit()}
              className="loginButtonAnimated"
            >
              <FormattedMessage id="btn.save" />
            </MenuButton>
          </Row>
          <Row className="buttonSpaceRow" align="middle" justify="center">
            <MenuButton onClick={handleCancel} className="loginButtonAnimated">
              <FormattedMessage id="btn.cancel" />
            </MenuButton>
          </Row>
        </>
      ) : (
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <MenuButton
            onClick={() => setEditMode(true)}
            className="loginButtonAnimated"
          >
            <FormattedMessage id="btn.edit" />
          </MenuButton>
        </Row>
      )}
    </div>
  );
}
export default ConfigurationsPage;
