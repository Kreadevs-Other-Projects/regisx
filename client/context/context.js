import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from "react";
import { useContext, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState(null);
  const userRef = useRef();

  const [orgId, setOrgId] = useState("");
  const [orgToken, setOrgToken] = useState(null);
  const orgRef = useRef();

  const userAuthentication = async () => {
    try {
      const userToken = await AsyncStorage.getItem(userId);

      if (userToken) {
        setUserToken(userToken);
        const decodeUserToken = jwtDecode(userToken);
        const userIdFromToken = decodeUserToken?.id;
        if (userIdFromToken) {
          setUserId(userIdFromToken);
          userRef.current = userIdFromToken;
        }
      }
    } catch (error) {
      console.log(error.message || "Error in retriveing user token");
    }
  };

  const orgAuthentication = async () => {
    try {
      const orgToken = await AsyncStorage.getItem(orgId);

      if (orgToken) {
        setOrgToken(orgToken);
        const decodeOrgToken = jwtDecode(orgToken);
        const orgIdFromToken = decodeOrgToken?.id;
        if (orgIdFromToken) {
          setOrgId(orgIdFromToken);
          orgRef.current = orgIdFromToken;
        }
      }
    } catch (error) {
      console.log(error.message || "Error in retriveing org token");
    }
  };

  return (
    <AppContext.Provider
      value={{
        setOrgId,
        setOrgToken,
        orgToken,
        orgId,
        orgRef,

        setUserId,
        userId,
        setUserToken,
        userToken,
        userRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
