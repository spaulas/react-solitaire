import ConfigurationsForm from "../../components/Forms/ConfigurationsForm/ConfigurationsForm.component";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import React from "react";

function ConfigurationsPage() {
  return (
    <div className="joyrideStartingPage mainPage">
      <PageTitle title={<FormattedMessage id="sidebar.configurations" />} />
      <ConfigurationsForm />
    </div>
  );
}
export default ConfigurationsPage;
