import { StyleSheet, Text, TextInput,View } from "react-native"


const InputTextField = ({label,onTextChange,password=false}) => {
  return (
    <View style={{
      marginTop:10,
    }}>
        <Text>{label}</Text>
        <TextInput secureTextEntry={password} onChangeText={onTextChange} placeholder={label} style={
        styles.input
        } />
    </View>
  )
}
const styles = StyleSheet.create({
  input:{
    marginTop:5,
    padding:5,
    borderRadius:5,
    shadowColor:"black",
    shadowOffset:{width:-2,height:4},
    shadowOpacity:0.2,
    shadowRadius:5
  }
});

export default InputTextField