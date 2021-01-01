import { AppState } from '../../state/AppState';

export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .catch(console.log);
};

export const load = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/load`
  );
  return await (response.json() as Promise<AppState>);
};
