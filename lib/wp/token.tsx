const auth = Buffer.from(
  process.env.GRAPHQL_USER + ':' + process.env.GRAPHQL_PASS
).toString('base64');
export const token = auth;
