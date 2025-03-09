import { AntDesign } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="Home" 
        options={{
          tabBarIcon:({color, size})=><AntDesign name="home" size={size} color={color} />
        }}
        />
        <Tabs.Screen name="Search" 
        options={{
          tabBarIcon:({color, size})=><AntDesign name="search1" size={size} color={color} />
        }}
        />
        <Tabs.Screen name="Menu" 
        options={{
          tabBarIcon:({color, size})=><Ionicons name="menu" size={size} color={color} />,
          headerShown:false
        }}
        />
        <Tabs.Screen name="Basket" 
        options={{
          tabBarIcon:({color, size})=><FontAwesome5 name="shopping-basket" size={size} color={color} />
        }}
        />
        <Tabs.Screen name="Account" 
        options={{
          tabBarIcon:({color, size})=><Feather name="user" size={size} color={color} />,
          headerShown:false
        }}
        />
    </Tabs>
  )
}

export default TabLayout