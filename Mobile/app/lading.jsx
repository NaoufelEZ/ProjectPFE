import { View } from "react-native";
import { useEffect, useState } from "react";
import Loading from "./pages/Loading";
import { Redirect } from "expo-router";

const Landing = () => {
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Redirect href="/(tabs)/Home" />; 
};

export default Landing;
