import React, {useEffect, useState} from "react";
import axios from "axios";
//Components
import CreatePostForm from '../components/CreatePostForm';

function Home({userInformation, createPostWithImage}) {
  const [allPosts, setAllPosts] = useState([]);
  const email = userInformation.email;
  const uid = userInformation.uid;

  // To make a request for the weather by city -->
  useEffect(() => {
      axios
        .get(
          //MY API ENDPOINT
          //Local:
          `http://localhost:4000/`
          //Production:
          //`https://myheroku-deployed-api.heroku.com`
        )
        .then(function(response){
          //Logs in success
          //why does it not show??
          console.log("response", response.data);
          setAllPosts(response.data);
        })
        .catch(function(error){
          //Logs in error
          console.log(error);
        });
  }, []);

  //Create a Post
  async function createPostFunction(e){
    e.preventDefault();
    let text = e.currentTarget.postText.value;
    const idFromText = text.replace(/\s+/g, "-").toLowerCase().substr(0, 15);
    let userId = uid;

    //Send the data to API
    axios
      .get(
        //MY API ENDPOINT
        //Local:
        `http://localhost:4000/create?text=${text}&id=${idFromText}&userId=${userId}`
        //Production:
        //`https://myheroku-deployed-api.heroku.com`
      )
      .then(function(response){
        //Logs in success
        //why does it not show??
        console.log("response", response);
      })
      .catch(function(error){
        //Logs in error
        console.log(error);
      });

  }

  return(
    <div className="Wrapper">
      <h1>Welcome, {email}! Post a comment with an image. </h1>

      <div className="CreatePost">
        <h2>Add a Post!</h2>
        <CreatePostForm createPostFunction={createPostWithImage}/>
      </div>

      <div className="CreatePost">
        <h2>See All Posts:</h2>
        {/*DISPLAY ALL POSTS HERE*/}
        {allPosts.map((post, i) => (
          <p key={i}>
            <a href={`/post/${post.id}`}>{post.text}</a>
          </p>
        ))}
      </div>

    </div>
  );
}

export default Home;
