import { FormattedMessage } from "react-intl";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import React from "react";

function ConfigurationsPage() {
  return (
    <div className="joyrideStartingPage startingPage">
      <PageTitle title={<FormattedMessage id="sidebar.configurations" />} />
    </div>
  );
}
export default ConfigurationsPage;
