import React, { memo } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage.component";
import GameBoard from "../pages/GameBoard/GameBoard.component";
import StartingPage from "../pages/StartingPage/StartingPage.component";

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
      {/* Game Play Page */}
      <Route exact path={`${url}/game`}>
        <GameBoard />
      </Route>
      {/* Anything else, should be sent to the error page */}
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default memo(ApplicationRouter);
