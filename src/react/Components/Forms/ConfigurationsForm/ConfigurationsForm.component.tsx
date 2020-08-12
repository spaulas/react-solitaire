import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/pt-br";
import { Checkbox, Col, Divider, Form, Input, Radio, Row, Tooltip } from "antd";
import { ExplicitAny, RootReducerState } from "../../../../global";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import moment from "moment";
import { useForm } from "antd/lib/form/util";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function ConfigurationsForm() {
  const [form] = useForm();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { loggedIn, ...userConfigs } = useSelector(
    ({ User }: RootReducerState) => {
      const user = User.user;
      return {
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        language: user.settings?.language,
        joyride: user.settings?.joyride || {},
        loggedIn: User.loggedIn
      };
    }
  );

  const onChange = (value: any) => {
    const { userName, language, joyride } = userConfigs;

    form.setFieldsValue(value);

    let finalChanges = {
      userName,
      settings: {
        language,
        joyride
      }
    };

    const key = Object.keys(value);
    if (key.indexOf("userName") === 0) {
      finalChanges = { ...finalChanges, ...value };
    } else if (key.indexOf("language") === 0) {
      finalChanges = {
        ...finalChanges,
        settings: { ...finalChanges.settings, ...value }
      };
    } else {
      finalChanges = {
        ...finalChanges,
        settings: {
          ...finalChanges.settings,
          joyride: { ...joyride, ...value }
        }
      };
    }
    dispatch(userActions.changeUserSettings(finalChanges));
  };

  return (
    <Form
      className="styledForm configurationsForm"
      name="configurationsForm"
      form={form}
      initialValues={userConfigs}
      onValuesChange={onChange}
    >
      <Row className="buttonSpaceRow" align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10}>
          {/* Username input item */}
          <Item
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.userName" })
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput"
              defaultValue={userConfigs.userName}
              onChange={(e: ExplicitAny) =>
                onChange({ userName: e.target.value })
              }
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.userName" />
            </label>
          </Item>
        </Col>
        <Col xs={24} sm={24} md={10}>
          {/* Created at input item (disabled) */}
          <Item name="createdAt">
            <Input
              disabled
              className="divButton loginButtonAnimated formInput"
              value={
                userConfigs.createdAt
                  ? moment(userConfigs.createdAt)
                      .locale(userConfigs.language?.split("-")[0])
                      .format("MMMM Do YYYY, h:mm:ss a")
                  : ""
              }
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.createdAt" />
            </label>
          </Item>
        </Col>
      </Row>
      <Row
        className="buttonSpaceRow extraSpaceRow"
        align="middle"
        justify="space-between"
      >
        {loggedIn ? (
          <Col xs={24} sm={24} md={10}>
            {/* Email input item (disabled and only visible for a logged in user) */}
            <Item name="email">
              <Input
                disabled
                className="divButton loginButtonAnimated formInput"
                defaultValue={userConfigs.email}
              />
              <label className="labelPlaceholder">
                <FormattedMessage id="table.email" />
              </label>
            </Item>
          </Col>
        ) : null}

        <Col xs={24} sm={24} md={10}>
          {/* Language radio button item (english, portuguese, german and spanish available) */}
          <Item name="language">
            <Radio.Group className="languagesRadioGroup">
              <Radio.Button className="flagRadioButton" value="en-US">
                <Tooltip title={<FormattedMessage id="languages.english" />}>
                  <ReactCountryFlag className="flags" countryCode="GB" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button className="flagRadioButton" value="pt-PT">
                <Tooltip title={<FormattedMessage id="languages.portuguese" />}>
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

      <Divider orientation="left" className="extraSpaceDivider">
        <FormattedMessage id="joyride.title" />
      </Divider>
      {/* Joyride checkboxes for each page */}
      <Row className="buttonSpaceRow" align="middle" justify="center">
        {Object.keys(userConfigs.joyride).map((page: string) => (
          <Col key={page} xs={24} sm={24} md={6}>
            <Checkbox
              checked={userConfigs.joyride[page]}
              onChange={e => onChange({ [page]: e.target.checked })}
            >
              <FormattedMessage id={`sidebar.${page}`} />
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Form>
  );
}

export default ConfigurationsForm;
