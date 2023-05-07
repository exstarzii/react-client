import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API;
interface Credentials {
  nickname: string;
  phone: string;
  photo: string;
  name: string;
  surename: string;
  email: string;
  age: string;
  sex: string;
  city: string;
  about: string;
}
const useGetUser = (): [Credentials, Dispatch<SetStateAction<Credentials>>] => {
  const [user, setUser] = useState<Credentials>({
    nickname: "",
    phone: "",
    photo: "",
    name: "",
    surename: "",
    email: "",
    age: "",
    sex: "",
    city: "",
    about: "",
  });
  useEffect(() => {
    const token = localStorage.token;
    axios
      .get(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        response.data.nickname = response.data.nickname
          ? response.data.nickname
          : "";
        response.data.phone = response.data.phone ? response.data.phone : "";
        response.data.photo = response.data.photo ? response.data.photo : "";
        response.data.name = response.data.name ? response.data.name : "";
        response.data.surename = response.data.surename
          ? response.data.surename
          : "";
        response.data.email = response.data.email ? response.data.email : "";
        response.data.age = response.data.age ? response.data.age : "";
        response.data.sex = response.data.sex ? response.data.sex : "";
        response.data.city = response.data.city ? response.data.city : "";
        response.data.about = response.data.about ? response.data.about : "";
        setUser(response.data);
      })
      .catch((error) => handleError(error));
  }, []);
  return [user, setUser];
};

const useUpdateUser = (credentials: any) => {
  const token = localStorage.token;
  let body: any = {};
  for (var key in credentials) {
    if (credentials.hasOwnProperty(key) && credentials[key] !== "") {
      body[key] = credentials[key];
    }
  }
  if (body.age) body.age = +body.age;
  console.log({ ...body });
  return axios.put(
    `${API_URL}/user`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

function handleError(error: any) {
  console.log(error.response);
}

export default {
  useUpdateUser,
  useGetUser,
};
