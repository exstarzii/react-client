import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import NotificationBar from "../Components/NotificationBar";
import PostCard from "./PostCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import api, { Post } from "../api";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Posts(props: any) {
  const notifyRef = useRef(null);
  const inputRef = useRef(null);
  const [posts, setPosts] = props.allUsers
    ? api.useGetFriendsPosts(props.currentUserId)
    : api.useGetPosts(props.urlId||props.currentUserId);
  const [newpost, setNewpost] = useState<Post>({
    text: "",
    image: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewpost({ ...newpost, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.useCreatePost(props.currentUserId, newpost).then((res) => {
      setNewpost({ text: "", image: "" });
      console.log(res);
      posts.unshift(res.data);
      setPosts(posts);
      setPostCards(getPostCards());
      const ref: any = notifyRef.current;
      ref.showMesssage("Post created", "success");
    })
    .catch((err)=>{
      const mes = err.response.data.message;
      console.log(mes);
      const ref: any = notifyRef.current;
      ref.showMesssage(mes || err.message, "error");
    })
  };
  const handleFileUpload = (event: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      const val = reader.result as string;
      setNewpost({ ...newpost, image: val });
    };
  };
  const handleClickInput = (event: any) => {
    const ref: any = inputRef.current;
    ref.click();
  };
  const handlePostDelete = (postId: any, i: number) => {
    api.useDeletePost(props.currentUserId, postId).then((res) => {
      console.log(res);
      posts.splice(i, 1);
      setPosts(posts);
      setPostCards(getPostCards());
      const ref: any = notifyRef.current;
      ref.showMesssage("Post deleted", "success");
    });
  };
  const handleLikePost = (postOwnerId:any,postId: any, i: number) => {
    api.useLikePost(postOwnerId, postId).then((res) => {
      console.log(res);
      posts[i] = res.data;
      setPosts(posts);
      setPostCards(getPostCards());
    });
  };
  const handleDislikePost = (postOwnerId:any,postId: any, i: number) => {
    api.useDislikePost(postOwnerId, postId).then((res) => {
      console.log(res);
      posts[i] = res.data;
      setPosts(posts);
      setPostCards(getPostCards());
    });
  };
  const getPostCards = () => {
    if (posts.length<1) return;
    return posts
      .map((post, i) => (
        <PostCard
          edit={props.edit}
          post={post}
          currentUserId={props.currentUserId}
          key={post._id}
          i={i}
          handlePostDelete={handlePostDelete}
          handleLikePost={handleLikePost}
          handleDislikePost={handleDislikePost}
        />
      ));
  };
  // const postCards= getPostCards()
  const [postCards, setPostCards] = useState<JSX.Element[]>();
  useEffect(() => {
    setPostCards(getPostCards());
    console.log("posts update");
  }, [posts]);
  return (
    <>
      <NotificationBar ref={notifyRef} />
      {props.edit ? (
        <Card className="post" key={-1}>
          <form onSubmit={handleSubmit}>
            <Typography
              sx={{ fontSize: 14 }}
              align="center"
              color="text.secondary"
            >
              New post
            </Typography>
            {newpost.image ? (
              <CardMedia
                component="img"
                height="194"
                image={newpost.image}
                alt="image"
              />
            ) : (
              ""
            )}
            <CardContent>
              <TextareaAutosize
                aria-label="minimum height"
                name="text"
                minRows={3}
                style={{ width: "100%" }}
                onChange={handleChange}
                value={newpost.text}
              />
            </CardContent>
            <CardActions>
              <input
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileUpload}
                ref={inputRef}
              />
              <Button size="small" onClick={handleClickInput}>
                Add image
              </Button>
              <Button size="small" type="submit">
                Create post
              </Button>
            </CardActions>
          </form>
        </Card>
      ) : (
        ""
      )}
      {postCards}
    </>
  );
}
export default Posts;
