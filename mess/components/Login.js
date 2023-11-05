//import liraries
import React, { Component,useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";


// create a component
const Login = ({navigation}) => {
  const [loginCred,setLoginCred]=useState({email:"",rollno:"",password:""});
  const [emaile,setEmaile]=useState("");
  const [rollnoe,setRollnoe]=useState("");
  const [passworde,setPassworde] = useState("");

  const handleChange1 = (e)=>{
    setEmaile(e);
  }
  const handleChange2 = (e)=>{
    setRollnoe(e);
  }
  const handleChange3 = (e)=>{
    setPassworde(e);
  }
  const loginSubmit = async(e)=>{
    // e.preventDefault();
    try {
      // setLodingState(true);
    const url = `https://4a85-2409-40c2-1-7eb4-b532-f356-aa4e-20e5.ngrok.io/api/auth/login`;
    const headers = {
        "Content-Type":"application/json"
    }
    setLoginCred({email:emaile,rollno:rollnoe,password:passworde});
    const response = await axios.post(url,loginCred,{headers});
    const json = await response.data;
    console.log(response.status);
    // setLodingState(false);
    if (response.status===200) {
      localStorage.setItem("token",json.authToken);
      // navigate("/");
      navigation.navigate("Qrcode");
      // console.log(json.success,json.name,json.email);
    }
    } catch (error) {
      // setLodingState(false);
      setLoginCred({email:"",rollno:"",password:""});
    }
  }

    return (
        <View style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.title}>
                Login
            </Text>
              <Text>
              Email ID :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email ID"
                onChangeText={handleChange1}
                // value={loginCred.email}
                required
            />
            <Text>
              Roll No. :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Roll Number"
                onChange={handleChange2}
                // value={loginCred.rollno}
                required
            />
            <Text>
              Password :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                // value={loginCred.password}
                onChange={handleChange3}
                required
            />
            <Button onPress={loginSubmit} title='Login'/>
            {/* <View  onPress={loginSubmit} title='Login'/> */}
            {/* <Text style={{margin:4,backgroundColor:"pink",padding:7,borderRadius:20}}  onPress={loginSubmit}>Login</Text> */}
            <View style={{margin:7}}></View>
            <Button onPress={()=>{navigation.navigate('Qrscan')}} title='Qrscan'/>
            <View style={{margin:7}}></View>
            <Button onPress={()=>{navigation.navigate('Qrcode')}} title='Qrcode'/>
            <View style={{margin:7}}></View>
            <Button onPress={()=>{navigation.navigate('Menu')}} title='Menu'/>
        </View>
        <Text className="mb-4" >Don't have an account? <Text onPress={()=>navigation.navigate('Signup')}>Sign up</Text></Text>
      <StatusBar style='auto'/>
      </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 32,
        paddingBottom: 20
      },
      input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 10,
        padding: 10,
      },
});

//make this component available to the app
export default Login;