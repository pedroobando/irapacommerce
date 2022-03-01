export const fetchgql = (_query: any, _variables: any, _token = '') => {
  const httpLinkRoute = process.env.REACT_APP_API_URL;
  return fetch(`${httpLinkRoute}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `bearer: ${_token}` },
    body: JSON.stringify({
      query: _query,
      variables: _variables,
    }),
  }).then((res) => res.json());
};

export const fetchgqlAsc = async (_query: any, _variables: any, _token = '') => {
  const httpLinkRoute = process.env.REACT_APP_API_URL;
  const { data, errors } = await fetch(`${httpLinkRoute}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `bearer: ${_token}` },
    body: JSON.stringify({
      query: _query,
      variables: _variables,
    }),
  }).then((res) => res.json());
  return { data, errors };
};
