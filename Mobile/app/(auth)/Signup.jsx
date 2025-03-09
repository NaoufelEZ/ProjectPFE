import {  Text, View } from "react-native";
import InputTextField from "@/components/InputTextField";
import { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { ApiKey, APIURL } from "@/API/api";

const Signup = () => {
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [phone,setPhone] = useState();
  const [emailError,setEmailError] = useState(false);
  const handleSubmit = async () =>{
    try{
    await axios.post(`${APIURL}/register`,{
      "first_name":firstName,
      "last_name":lastName,
      "email":email,
      "password":password,
      "phone":phone
    },
  {
    headers:{
      "Accept":"application/json",
      "x-api-key":ApiKey,
    }
  });
}catch(err){
  if (err.status === 422) {
    setEmailError(true);

  }
}
  }

  return (
    <View style={{
      padding:10
      }}>
    <View>
      <InputTextField onTextChange={(e)=>setFirstName(e)}  label="First Name" />
      <InputTextField onTextChange={(e)=>setLastName(e)} label="Last Name" />
      <InputTextField onTextChange={(e)=>setEmail(e)} label="Email" />
     { emailError && 
      <View style={{
        marginTop:10
      }}>
        <Text>email is already used</Text>
      </View>
    }
      <InputTextField password={true} onTextChange={(e)=>setPassword(e)} label="Password" />
      <InputTextField onTextChange={(e)=>setPhone(e)} label="Phone" />
    </View>
      <Button onPress={handleSubmit} text="Sign Up" />
    </View>
  );
};

export default Signup;
