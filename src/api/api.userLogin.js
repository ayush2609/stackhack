import axios from "../utils/API";
import HttpApiCallError from "../errors/HttpApiCallError";

export async function userLoginApi(params) {
  const url = "/auth/login";
  const data = JSON.stringify({
    ...params,
  });

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}

export async function userSignupApi(params) {
  const url = "/auth/register";
  const data = JSON.stringify({
    ...params,
  });

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}

export async function userLogoutApi(obj) {
  const url = "/auth/logout";
  const data = JSON.stringify({
    ...obj.parameters,
  });

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
    },
  });

  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}
