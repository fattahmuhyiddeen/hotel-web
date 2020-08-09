export const URL = process.env.URL;
export const endpoints = {
  getAll: () => ["GET", URL + "hotels"],
  insert: () => ["POST", URL + "hotel"],
  update: (id) => ["PUT", URL + "hotel/" + id],
  delete: (id) => ["DELETE", URL + "hotel/" + id],
};
