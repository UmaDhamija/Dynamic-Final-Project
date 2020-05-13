import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

function SinglePost(){
  const [postData, setPostData] = useState({});
  const { id } = useParams();
  console.log("id", id);

  // To make a request
  useEffect(() => {
      axios
        .get(
          //MY API ENDPOINT
          //Local:
          `http://localhost:4000/post/${id}`
          //Production:
          //`https://myheroku-deployed-api.heroku.com`
        )
        .then(function(response){
          //Logs in success
          //why does it not show??
          setPostData(response.data);
        })
        .catch(function(error){
          //Logs in error
          console.log(error);
        });
  }, []);

  return(
    <div className="SinglePost Wrapper">
      <img src={postData.image} alt={postData.id} />
      <p>{postData.text}</p>
    </div>
  );
}

export default SinglePost;
