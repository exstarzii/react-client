import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const PostCard = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  const isLiked = props.post.likes&& props.post.likes.includes(props.currentUserId);
  const like = () => {
    isLiked
      ? props.handleDislikePost(props.post.author._id,props.post._id, props.i)
      : props.handleLikePost(props.post.author._id,props.post._id, props.i)
  };

  return (
    <Card className="post" key={props.post._id}>
      <CardHeader
        avatar={
          <Avatar
            alt="avatar"
            src={props.post.author.photo? props.post.author.photo:"" }
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="left-start"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    {props.edit ? (
                      <>
                        {/* <Button size="small">Edit post</Button> */}
                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            props.handlePostDelete(props.post._id, props.i)
                          }
                        >
                          Delete post
                        </Button>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </Paper>
                </Fade>
              )}
            </Popper>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          props.post.author.surename && props.post.author.name
            ? props.post.author.surename + " " + props.post.author.name
            : props.post.author.nickname
        }
        subheader={new Date(props.post.date || "").toLocaleString()}
      />
      {props.post.image ? (
        <CardMedia
          component="img"
          height="194"
          image={props.post.image}
          alt="image"
        />
      ) : (
        ""
      )}
      <CardContent>
        <Typography variant="body1">{props.post.text}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={like}>
          <Typography color={isLiked?"error":"inherit"} variant="body1">{props.post.likes?props.post.likes.length:''}</Typography>
          <FavoriteIcon color={isLiked?"error":"inherit"}/>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default PostCard;
