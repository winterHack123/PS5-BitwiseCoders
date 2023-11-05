//import liraries
import React, { Component,useState } from 'react';
import { View, Text, TextInput, StyleSheet,Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import axios from 'axios';

// create a component
const Signup = ({navigation}) => {
  const [signCred,setSignCred]=useState({name:"",email:"",rollno:"",password:"",cpassword:""});
  const [name,setNamee]=useState("");
  const [rollno,setRollno]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCpassword]=useState("");  
  const [email,setEmail]=useState("");  

  // const [lodingState,setLodingState] = useState(false);

  const handleName = (e)=>{
    setNamee(e);
  }
  const handlerollno = (e)=>{
    setRollno(e);
  }
  const handlepassword = (e)=>{
    setPassword(e);
  }
  const handlecpassword = (e)=>{
    setCpassword(e);
  }
  const handleid = (e)=>{
    setEmail(e);
  }
//   const handleSubmit = ()=>{
//     fetch('https://4a85-2409-40c2-1-7eb4-b532-f356-aa4e-20e5.ngrok.io/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         password:password,
//         rollno:rollno
//       }),
//     })
//     .then((response) => {
//       if (response) {
//           console.log(response.json());
//           navigation.navigate('Home');
//         } else {
//           console.log('Network response was not ok');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//   })
// }
  

  const handleSubmit=async()=>{
    try {
      // setLodingState(true);
      let data = {
        name:name,
        email:email,
        password:password,
        rollno:rollno,
        img:"sdfsfsdfdsf"
      };
      
      const url = 'https://4a85-2409-40c2-1-7eb4-b532-f356-aa4e-20e5.ngrok.io/api/auth/signup';
      const headers = {
          "Content-Type":"application/json"
      }
      const response = await axios.post(url,data,{headers});
      const json = await response.data;
      if(response.status===200){
        navigation.navigate('Home');
      };
      // setLodingState(false);

      if (json.success) {
        localStorage.setItem("token",json.authToken);
        // showAlert(json.success,"Account created successfully");
        navigation.navigate('Qrcode');
      }
    } catch (error) {
      // setLodingState(false);
      setSignCred({name:"",email:"",rollno:"",password:"",cpassword:""});
      // showAlert(false,"Invalid username or password. Please try again.");
    }
  }

    return (
        <View style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.title}>
                Signup
            </Text>
              <Text>
              Name :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleName}
            /> 
            <Text>
              Email ID :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email ID"
                onChangeText={handleid}
            />
            <Text>
              Roll No :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Roll Number"
                onChangeText={handlerollno}
            />
            <Text>
              Password :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handlepassword}
            />
            <Text>
              Confirm Password :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handlecpassword}
            />
            <Button onPress={() => handleSubmit()} title='Sign-Up'/>

        </View>
        <Text className="mb-4" >Already have an account? <Text onPress={()=>navigation.navigate('Login')}>Login</Text></Text>
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
export default Signup;