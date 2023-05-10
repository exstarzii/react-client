import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import jwt_decode from "jwt-decode";
import Posts from "../Components/Posts";

function Post() {
  let { urlId } = useParams();
  const payload: any = jwt_decode(localStorage.token);

  return (
    <div className="page-container">
      <Layout />
      <div className="page-content page-post">
        <div className="form-container">
          <Posts
            urlId={urlId}
            currentUserId = {payload.sub}
            allUsers={true}
          />
        </div>
      </div>
    </div>
  );
}
export default Post;
