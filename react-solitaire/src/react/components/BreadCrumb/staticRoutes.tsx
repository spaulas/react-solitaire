// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBreadRoutes = (intl: any) => {
  const breadRoutes: Record<string, string> = {
    "/": intl.formatMessage({ id: "sidebar.home" }),
    "/scores": intl.formatMessage({ id: "sidebar.scores" }),
    "/scores/userHighScores": intl.formatMessage({
      id: "sidebar.userHighScores"
    }),
    "/scores/top10HighScores": intl.formatMessage({
      id: "sidebar.top10HighScores"
    }),
    "/statistics": intl.formatMessage({ id: "sidebar.statistics" }),
    "/configurations": intl.formatMessage({ id: "sidebar.configurations" })
  };

  return breadRoutes;
};

export default getBreadRoutes;
