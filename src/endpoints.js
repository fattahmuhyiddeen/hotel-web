export const URL = "http://localhost:3001/";
// export const URL = "https://crud-system.herokuapp.com/";
export const endpoints = {
  getAll: () => ["GET", URL + "hotels"],
  insert: () => ["POST", URL + "hotel"],
  update: (id) => ["PUT", URL + "hotel/" + id],
  delete: (id) => ["DELETE", URL + "hotel/" + id],
};
