const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const URL = "http://localhost:3001/api";

const getNews = async (subject: string) => {
  return fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch((error) => {
      console.log("Ocorreu um erro", error);
      return null;
    });
};

const getNewsById = async (subject: string, id: string) => {
  return fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch((error) => {
      console.log("Ocorreu um erro", error);
      return null;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNews,
  getNewsById,
};
