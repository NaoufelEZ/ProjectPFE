import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index"
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen name="lading"
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen name="pages/Loading"
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen name="(tabs)"
      options={{
        headerShown:false,
      }}
      />
      <Stack.Screen name="(auth)/Login"
      options={{
        headerShown:false,
       
      }}
      />
    </Stack>
  );
  
}
