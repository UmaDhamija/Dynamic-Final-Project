import React from 'react';
//Components
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({CreateAccountFunction}) {
  return(
    <div className="Wrapper">
      <h1>CreateAccount</h1>
      <div className="CreateWrapper">
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction}/>
        <div className="CreateInformation">
          <h2>About site</h2>
          <p>This information</p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
