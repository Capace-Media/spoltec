export const credentials = btoa(
  process.env.APPLICATION_USER + ":" + process.env.APPLICATION_PASSWORD
);

const auth = Buffer.from(
  process.env.GRAPHQL_USER + ":" + process.env.GRAPHQL_PASS
).toString("base64");
export const token = auth;
