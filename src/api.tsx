import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API;
export interface Credentials {
  _id?: string;
  nickname?: string;
  phone?: string;
  photo?: string;
  name?: string;
  surename?: string;
  email?: string;
  age?: string;
  sex?: string;
  city?: string;
  about?: string;
  friends?: [string];
}
export interface Post {
  _id?: string;
  text?: string;
  likes?: [string];
  image?: string;
  date?: number;
  author?: any;
}
const useGetUser = (): [Credentials, Dispatch<SetStateAction<Credentials>>] => {
  return useGetUserById("");
};

const useGetUserById = (
  _id: string
): [Credentials, Dispatch<SetStateAction<Credentials>>] => {
  const [user, setUser] = useState<Credentials>({});
  useEffect(() => {
    const token = localStorage.token;
    let url;
    if (!_id) url = `${API_URL}/user`;
    else url = `${API_URL}/user/${_id}`;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("useGetUserById", response);
        setUser(response.data);
      })
      .catch((error) => handleError(error));
  }, [_id]);
  return [user, setUser];
};

const useGetPeople = (): [
  [Credentials],
  Dispatch<SetStateAction<[Credentials]>>
] => {
  const [users, setUsers] = useState<[Credentials]>([{}]);
  useEffect(() => {
    const token = localStorage.token;
    axios
      .get(`${API_URL}/user/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => handleError(error));
  }, []);
  return [users, setUsers];
};

const useGetFriends = (): [
  [Credentials],
  Dispatch<SetStateAction<[Credentials]>>
] => {
  const [users, setUsers] = useState<[Credentials]>([{}]);
  useEffect(() => {
    const token = localStorage.token;
    axios
      .get(`${API_URL}/user/friends`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => handleError(error));
  }, []);
  return [users, setUsers];
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

const useAddFriend = (id: string) => {
  const token = localStorage.token;
  return axios
    .post(
      `${API_URL}/user/friends`,
      {
        _id: id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .catch((error) => handleError(error));
};

const useDelFriend = (id: string) => {
  const token = localStorage.token;
  return axios
    .delete(`${API_URL}/user/friends/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .catch((error) => handleError(error));
};

const useGetPosts = (
  userId: string
): [Post[], Dispatch<SetStateAction<Post[]>>] => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const token = localStorage.token;
    axios
      .get(`${API_URL}/user/${userId}/post`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => handleError(error));
  }, [userId]);
  return [posts, setPosts];
};

const useCreatePost = (userId: string, body: any) => {
  const token = localStorage.token;
  return axios.post(
    `${API_URL}/user/${userId}/post`,
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

const useDeletePost = (userId: string, id: any) => {
  const token = localStorage.token;
  return axios.delete(`${API_URL}/user/${userId}/post/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const useLikePost = (postOwnerId: string, postId: any) => {
  const token = localStorage.token;
  return axios.post(
    `${API_URL}/user/${postOwnerId}/post/${postId}/like`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

const useDislikePost = (postOwnerId: string, postId: any) => {
  const token = localStorage.token;
  return axios.delete(`${API_URL}/user/${postOwnerId}/post/${postId}/like`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const useGetFriendsPosts = (
  userId: string
): [Post[], Dispatch<SetStateAction<Post[]>>] => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const token = localStorage.token;
    axios
      .get(`${API_URL}/user/${userId}/post/friends`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => handleError(error));
  }, [userId]);
  return [posts, setPosts];
};

function handleError(error: any) {
  console.log(error.response);
}

export default {
  useUpdateUser,
  useGetUser,
  useGetPeople,
  useGetUserById,
  useAddFriend,
  useGetFriends,
  useDelFriend,
  useGetPosts,
  useCreatePost,
  useDeletePost,
  useLikePost,
  useDislikePost,
  useGetFriendsPosts
};
