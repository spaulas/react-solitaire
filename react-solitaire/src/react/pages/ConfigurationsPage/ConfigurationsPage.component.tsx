import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Tooltip
} from "antd";
import { ExplicitAny, RootReducerState } from "../../../global";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    // eslint-disable-next-line no-console
    console.log("VALUES = ", finalChanges);
    dispatch(userActions.changeUserSettings(finalChanges));
  };
  return (
    <div className="joyrideStartingPage startingPage">
      <PageTitle title={<FormattedMessage id="sidebar.configurations" />} />
      <Form
        initialValues={{ userName, email, createdAt, language, ...joyride }}
        name="loginForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row className="buttonSpaceRow" align="middle">
          <Item
            label={<FormattedMessage id="table.userName" />}
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.error.userName" })
              }
            ]}
          >
            <Input
              disabled={!editMode}
              className="divButton loginButtonAnimated"
            />
          </Item>
          <Item
            label={<FormattedMessage id="table.createdAt" />}
            name="createdAt"
          >
            <Input disabled className="divButton loginButtonAnimated" />
          </Item>
        </Row>

        <Row className="buttonSpaceRow" align="middle">
          {!loggedOut ? (
            <Item label={<FormattedMessage id="table.email" />} name="email">
              <Input disabled className="divButton loginButtonAnimated" />
            </Item>
          ) : null}

          <Item
            label={<FormattedMessage id="languages.title" />}
            name="language"
          >
            <Radio.Group className="languagesRadioGroup" disabled={!editMode}>
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
        </Row>

        <Divider orientation="left">
          <FormattedMessage id="joyride.title" />
        </Divider>

        <Row className="buttonSpaceRow" align="middle">
          {Object.keys(joyride).map((page: string) => (
            <Col key={page}>
              <Item name={page} valuePropName="checked">
                <Checkbox disabled={!editMode} defaultChecked={joyride[page]}>
                  {page}
                </Checkbox>
              </Item>
            </Col>
          ))}
        </Row>
      </Form>
      {editMode ? (
        <>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button onClick={() => form.submit()}>Save</Button>
        </>
      ) : (
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      )}
    </div>
  );
}
export default ConfigurationsPage;
