//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Menu = () => {
    return (
        <View style={styles.container}>
            <Text className="my-3 text-2xl">Menu</Text>
            <Text className="my-1">Rice</Text>
            <Text className="my-1">Dal</Text>
            <Text className="my-1">Muttor Panneer</Text>
            <Text className="my-1">Roti</Text>
            <Text className="my-1">Ice-Cream</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Menu;
