import { authApi } from '.';

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginResponse = await authApi.post('/user/login', { email, password });
  return loginResponse.data.token;
};

export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  await authApi.post('/user/create', { username, email, password });
};
