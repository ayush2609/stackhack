import axios from "../utils/API";
import HttpApiCallError from "../errors/HttpApiCallError";

export async function addTasks(obj) {
  const url = "/api/tasks/create";
  const data = JSON.stringify({
    ...obj.parameters,
  });

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${obj.token}`,
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

export async function getLabels(token) {
  const url = `/api/labels/getLabels`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
  const response = await axios.get(url, { headers });
  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}

export async function addNewLabel(obj) {
  const url = "/api/labels/create";
  const data = JSON.stringify({
    ...obj.parameters,
  });

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${obj.token}`,
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

export async function getAllTasksApi(obj) {
  const url1 = `/api/tasks/get-tasks?status=${obj.parameters.status}&label=${obj.parameters.label}`;

  const url2 =
    obj.parameters.startDate && obj.parameters.endDate
      ? `&startDate=${obj.parameters.startDate}&endDate=${obj.parameters.endDate}`
      : "";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${obj.token}`,
  };
  const response = await axios.get(url1 + url2, { headers });
  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}

export async function deleteTask(obj) {
  const url = "/api/tasks/delete";
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${obj.token}`,
    },
    data: { task_id: obj.parameters.task_id },
  });
  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}

export async function editTask(obj) {
  const url = "/api/tasks/edit";
  const data = JSON.stringify({
    ...obj.parameters,
  });
  
  const response = await axios.put(url, data,  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`
    }
  });
  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return await response;
  }
  const error = new HttpApiCallError(response.statusText, response.status);
  error.response = await response;
  throw error;
}
