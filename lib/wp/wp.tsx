import { token } from './token';

const WP = async (query: string, variables?: any) => {
  console.log('TOKEN', token);
  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: variables || null,
      }),
    });
    if (response.status === 500) {
      throw response.statusText;
    }
    const data = await response.json();
    console.log('DATA WP ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR WP ==>', error);
    return null;
  }
};

export default WP;
