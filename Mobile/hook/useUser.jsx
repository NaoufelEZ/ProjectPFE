import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser(isLogout = false) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserToken = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem("auth");
      setUser(value);
    } catch (error) {
      console.error("Error retrieving data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserToken();
  }, [isLogout]);

  return { user, loading };
}
