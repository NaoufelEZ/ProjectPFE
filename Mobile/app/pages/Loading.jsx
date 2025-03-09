import { MotiView } from "moti";
import { Text, View } from "react-native";



const Loading = () => {

  return (
    <View style={{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
    }}>
    <MotiView
      from={{
        width:50,
        height:50,
        borderRadius: 50 / 2
      }}
      animate={{
        width:50 + 20 ,
        height:50 + 20,
        borderRadius: (50 + 20) / 2
      }}
      transition={{
        type:"timing",
        duration:1000,
        repeat:Infinity,
      }}
      style={{
        width:50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:10,

      }}
  />
    </View>
    
  );
};

export default Loading;
