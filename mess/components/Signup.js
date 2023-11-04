//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// create a component
const Signup = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.title}>
                Signup
            </Text>
              <Text>
              Email ID :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email ID"
                onChangeText={(text) => setUsername(text)}
            />
            <Text>
              Password :
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
        </View>
        <Text className="mb-4" >Already have an account? <Text onPress={()=>navigation.navigate('Login')}>Login</Text></Text>
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