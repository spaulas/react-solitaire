import React, { Suspense, memo } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const AboutPage = React.lazy(() =>
  import("../../../Pages/AboutPage/AboutPage.component")
);
const ConfigurationsPage = React.lazy(() =>
  import("../../../Pages/ConfigurationsPage/ConfigurationsPage.component")
);
const ErrorPage = React.lazy(() =>
  import("../../../Pages/ErrorPage/ErrorPage.component")
);
const GameBoard = React.lazy(() =>
  import("../../../Pages/GameBoard/GameBoard.component")
);
const LoginPage = React.lazy(() =>
  import("../../../Pages/LoginPage/LoginPage.component")
);
const ScoresPage = React.lazy(() =>
  import("../../../Pages/ScoresPage/ScoresPage.component")
);
const SignUpPage = React.lazy(() =>
  import("../../../Pages/SignUpPage/SignUpPage.component")
);
const StartingPage = React.lazy(() =>
  import("../../../Pages/StartingPage/StartingPage.component")
);
const StatisticsPage = React.lazy(() =>
  import("../../../Pages/StatisticsPage/StatisticsPage.component")
);

/**
 * App available routes and corresponding pages
 */

function ApplicationRouter() {
  // eventually add the acl for the user's page
  const match = useRouteMatch();
  const url = match.url === "/" ? "" : match.url;

  return (
    <Switch>
      {/* Starting Page */}
      <Route exact path={`${url}/`}>
        <Suspense fallback={<div>Loading...</div>}>
          <StartingPage />
        </Suspense>
      </Route>
      <Route exact path={`${url}/login`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      </Route>
      <Route exact path={`${url}/signUp`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      </Route>
      {/* Game Play Page */}
      <Route exact path={`${url}/game`}>
        <Suspense fallback={<div>Loading...</div>}>
          <GameBoard />
        </Suspense>
      </Route>
      {/* Scores Page */}
      <Route exact path={[`${url}/scores/userHighScores`, `${url}/scores`]}>
        <Suspense fallback={<div>Loading...</div>}>
          <ScoresPage activeTab="1" />
        </Suspense>
      </Route>
      <Route exact path={`${url}/scores/top10HighScores`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ScoresPage activeTab="2" />
        </Suspense>
      </Route>
      {/* Statistics Page */}
      <Route exact path={`${url}/statistics`}>
        {" "}
        <Suspense fallback={<div>Loading...</div>}>
          <StatisticsPage />
        </Suspense>
      </Route>
      {/* Configurations Page */}
      <Route exact path={`${url}/configurations`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConfigurationsPage />
        </Suspense>
      </Route>
      {/* About Page */}
      <Route exact path={`${url}/about`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutPage />
        </Suspense>
      </Route>
      {/* Anything else, should be sent to the error page */}
      <Route>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorPage />
        </Suspense>
      </Route>
    </Switch>
  );
}

export default memo(ApplicationRouter);
