import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../../firebase";
import UserContext from './UserContext'


// export const UserContext = createContext({ user: null });

class UserState extends Component {
  state = {
    user: null
  };

  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserState;
