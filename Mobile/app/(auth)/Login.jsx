import { useRouter } from "expo-router"
import { Pressable, Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import InputTextField from '../../components/InputTextField';
import Button from '../../components/Button';
import { ApiKey, APIURL } from "@/API/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(false);
  const router = useRouter();
  const saveData = async (token) => {
    try {
      await AsyncStorage.setItem('auth', token);
      console.log('Data saved!');
    } catch (error) {
      console.error('Error saving data', error);
    }
  };
  const handleSubmit = async () => {
    try{
      const response = await axios.post(`${APIURL}/login`,{
      email:email,
      password:password,
    },
    {
      headers:{
        Accept:"application/json",
        "x-api-key":ApiKey,
      }
    });
    const token = response.data.token;
    await saveData(token);
    router.push("../(tabs)/Account");
  }
  catch(err){
    setError(true)
    console.log(err)
  }
  }
  return (
    <View style={{
      padding:15
    }}>
        <Pressable onPress={()=>router.back()}><Ionicons name="close" size={24} color="black" /></Pressable>
      <View style={{
        marginTop:50,
      }}>
        <InputTextField label={"Email"} onTextChange={setEmail} />
        <InputTextField password={true} label={"Password"} onTextChange={setPassword} />
        <Button  text={"Login"} onPress={handleSubmit}  />
        {error &&
         <Text
          style={{
            color:"red",
            marginTop:10,
            textAlign:"center"
          }}
         >Email or Password Are Wrong</Text>
         }
      </View>
    </View>
  )
}

export default Login