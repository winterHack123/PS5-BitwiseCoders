import { StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Qrscan from "./components/Qrscan";
import Qrcode from "./components/Qrcode";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Login/>
    //   <StatusBar style="auto" />
    // </View>
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Qrscan" component={Qrscan} />
        <Stack.Screen name="Qrcode" component={Qrcode} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
