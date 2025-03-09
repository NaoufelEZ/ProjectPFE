import {  useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import useUser from "@/hook/useUser";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiKey, APIURL } from "@/API/api";
import Colors from "@/data/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Account = () => {
  const [isLogout, setIsLogout] = useState(false);
  const {user , loading} = useUser(isLogout)
  const [dataUser , setDataUser] = useState()
  const router = useRouter();
  useEffect(()=>{
    if(user !== null){
    axios.get(`${APIURL}/user`,
    {
      headers:{
        Accept:"application/json",
        "x-api-key":ApiKey,
        Authorization:`Bearer ${user}`,
        
      }
    }).then((response)=>setDataUser(response.data.data));
  }
  },[user]);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      console.log('logout');
      router.replace("/(tabs)/Home");
      setIsLogout(true)
    } catch (error) {
      console.error('Error saving data', error);
    }
  }
  return (
    <>
    {
      loading ? 
      <ActivityIndicator size={"small"} />
      : user !== null ? <View style={{
        padding:10
      }}>
        <Text style={{
          fontSize:30,
          fontWeight:"bold"
        }}>
        Hi
        </Text>
        <Text
        style={{
          fontSize:20,
        }}
        >{dataUser ? dataUser.first_name : "..."}</Text>
        <View style={{
          padding:10
        }}>
          <Pressable onPress={{}}
            style={{
              flex:1,
              flexDirection:"row",
              alignItems:"center",
              gap:5,
              marginBottom:10

            }}
          >
          <View style={{
            borderRadius:50,
            backgroundColor:Colors.GREY,
            padding:5
          }}>
            <Ionicons name="basket-sharp" size={24} color="black" />
            {/* <Feather name="user" size={24} color="black" /> */}
          </View>
          <Text>
            My Purchases
          </Text>
          </Pressable>
          <Pressable onPress={{}}
            style={{
              flex:1,
              flexDirection:"row",
              alignItems:"center",
              gap:5,
              marginBottom:10

            }}
          >
          <View style={{
            borderRadius:50,
            backgroundColor:Colors.GREY,
            padding:5
          }}>
            <Feather name="user" size={24} color="black" />
          </View>
          <Text>
            Personal Details
          </Text>
          </Pressable>
          <Pressable onPress={{}}
            style={{
              flex:1,
              flexDirection:"row",
              alignItems:"center",
              gap:5,
              marginBottom:10

            }}
          >
          <View style={{
            borderRadius:50,
            backgroundColor:Colors.GREY,
            padding:5
          }}>
           <FontAwesome6 name="address-card" size={24} color="black" />
          </View>
          <Text>
            Saved Addresses
          </Text>
          </Pressable>
          <Pressable onPress={logout}
            style={{
              flex:1,
              flexDirection:"row",
              alignItems:"center",
              gap:5,
              marginBottom:10

            }}
          >
          <View style={{
            borderRadius:50,
            backgroundColor:Colors.GREY,
            padding:5
          }}>
            <MaterialIcons name="logout" size={24} color="black" />
          </View>
          <Text>
            Logout
          </Text>
          </Pressable>


        </View>
        
      </View>
      : router.push("/(auth)/Login") || null
    }
    </>
  )
}

export default Account