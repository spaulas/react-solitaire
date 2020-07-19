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

  /**
   * Submit form function
   * @param values form fields values
   */
  const onSubmit = ({
    userName,
    language,
    createdAt,
    email,
    ...joyride // the remaining fields are all from the joyride checkboxes
  }: ExplicitAny) => {
    // separate the language and the joyride into the settings key
    const finalChanges = {
      userName,
      settings: {
        language,
        joyride
      }
    };
    dispatch(userActions.changeUserSettings(finalChanges));
    // close the edit mode
    setEditMode(false);
  };

  /**
   * Called when the edit changes are canceled
   */
  const handleCancel = () => {
    // reset all the original values
    form.resetFields();
    // close the edit mode
    setEditMode(false);
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
  };

  return (
    <div className="joyrideStartingPage mainPage">
      <PageTitle title={<FormattedMessage id="sidebar.configurations" />} />
      <Form
        className="configurationsForm"
        name="configurationsForm"
        form={form}
        initialValues={{ userName, email, createdAt, language, ...joyride }}
        onFinish={onSubmit}
      >
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <Col>
            {/* Username input item */}
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
            {/* Created at input item (disabled) */}
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
              {/* Email input item (disabled and only visible for a logged in user) */}
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
            {/* Language radio button item (english, portuguese, german and spanish available) */}
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
        {/* Joyride checkboxes for each page */}
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
        // at the edit mode, the buttons save and cancel are displayed
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
        // when not editing, only the edit button is shown
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
