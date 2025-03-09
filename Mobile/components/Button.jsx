import Colors from "@/data/Colors"
import { TouchableOpacity } from "react-native";


const Button = ({text,onPress}) => {
  return (
    <TouchableOpacity style={{
        marginTop:10,
        padding:10,
        backgroundColor:Colors.PRIMARY,
        borderRadius:5
    }}
    onPress={onPress}
    >
        <text style={{
            color:Colors.WHITE,
            textAlign:"center",
        }}>{text}</text>
    </TouchableOpacity>
  )
}

export default Button