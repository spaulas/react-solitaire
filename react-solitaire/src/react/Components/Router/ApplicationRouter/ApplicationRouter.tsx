import React, { memo } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AboutPage from "../../../Pages/AboutPage/AboutPage.component";
import ConfigurationsPage from "../../../Pages/ConfigurationsPage/ConfigurationsPage.component";
import ErrorPage from "../../../Pages/ErrorPage/ErrorPage.component";
import GameBoard from "../../../Pages/GameBoard/GameBoard.component";
import LoginPage from "../../../Pages/LoginPage/LoginPage.component";
import ScoresPage from "../../../Pages/ScoresPage/ScoresPage.component";
import SignUpPage from "../../../Pages/SignUpPage/SignUpPage.component";
import StartingPage from "../../../Pages/StartingPage/StartingPage.component";
import StatisticsPage from "../../../Pages/StatisticsPage/StatisticsPage.component";

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
        <StartingPage />
      </Route>
      <Route exact path={`${url}/login`}>
        <LoginPage />
      </Route>
      <Route exact path={`${url}/signUp`}>
        <SignUpPage />
      </Route>
      {/* Game Play Page */}
      <Route exact path={`${url}/game`}>
        <GameBoard />
      </Route>
      {/* Scores Page */}
      <Route exact path={[`${url}/scores/userHighScores`, `${url}/scores`]}>
        <ScoresPage activeTab="1" />
      </Route>
      <Route exact path={`${url}/scores/top10HighScores`}>
        <ScoresPage activeTab="2" />
      </Route>
      {/* Statistics Page */}
      <Route exact path={`${url}/statistics`}>
        <StatisticsPage />
      </Route>
      {/* Configurations Page */}
      <Route exact path={`${url}/configurations`}>
        <ConfigurationsPage />
      </Route>
      {/* About Page */}
      <Route exact path={`${url}/about`}>
        <AboutPage />
      </Route>
      {/* Anything else, should be sent to the error page */}
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default memo(ApplicationRouter);
