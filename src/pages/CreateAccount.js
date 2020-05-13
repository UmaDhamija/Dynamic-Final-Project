import React from 'react';
//Components
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({CreateAccountFunction}) {
  return(
    <div className="Wrapper">
      <h1>Create An Account</h1>
      <div className="CreateWrapper">
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction}/>
        <div className="CreateInformation">
          <h2>"When you are content to be simply yourself and don't compare or compete, everybody will respect you."</h2>
          <p>Lao Tzu</p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
