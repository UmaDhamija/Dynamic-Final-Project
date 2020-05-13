import React from "react";

function CreatePostForm ({createPostFunction}){
  return(
    <form className="Form CreatePostForm" onSubmit={(e) => createPostFunction(e)}>

      <label htmlFor="postText">Text</label>
      <input type="Text" name="postText" />

      <label htmlFor="postImage">Image</label>
      <input type="file" name="postImage" accept="image/*"/>

      <button>Submit</button>
    </form>
  )

}

export default CreatePostForm;
