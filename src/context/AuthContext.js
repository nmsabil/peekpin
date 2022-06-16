import { createContext, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(getAuth, email, password);
  };

  return (
    <UserContext.Provider value={{ signIn }}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
