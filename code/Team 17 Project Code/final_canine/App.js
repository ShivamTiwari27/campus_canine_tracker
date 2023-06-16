// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Alert, Platform } from 'react-native';
import { useImageDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Login from './app/screens/Login';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './app/screens/Register';
import HomePage from './app/screens/HomePage';
import Forgot from './app/screens/Forgot';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Navbar from './app/components/navbar';
import { LogBox } from 'react-native';
import Dogs_list from './app/screens/Dogs_list';
import Dogs_profile from './app/screens/Dogs_profile';
import Loader from './app/screens/Loader';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// import Routes from './app/components/Routes';


const Stack = createNativeStackNavigator();
export default function App() {

  // const handlepress = () => { console.log("handle Press in funct") }
  // const view = useDeviceOrientation();
  // console.log(useDeviceOrientation());
  // console.log(view);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const DisplayData = async () => {
    try {
      let isLoggedIn1 = await AsyncStorage.getItem('isLoggedIn');
      let isTrueSet = (isLoggedIn1 === 'true');

      setisLoggedIn(isTrueSet);
    }
    catch (error) {
      // alert(error);
    }
  }
  useEffect(() => {
    DisplayData();
  }, []);

  return (

    <View style={{ flex: 1 }}>
      {/* <Routes></Routes> */}
      {/* <Navbar></Navbar> */}
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen
            name="Welcome"
            // component={isLoggedIn ? HomePage : WelcomeScreen}
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ title: 'HomePage' }}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{ title: 'Forgot' }}
          />
          <Stack.Screen
            name="Dogs_list"
            component={Dogs_list}
            options={{ title: 'Dogs_list' }}
          />
          <Stack.Screen
            name="Dogs_profile"
            component={Dogs_profile}
            options={{ title: 'Dogs_profile' }}
          />
          <Stack.Screen
            name="Loader"
            component={Loader}
            options={{ title: 'Loader' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}
{/* <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            // component={isLoggedIn ? HomePage : WelcomeScreen}
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ title: 'HomePage' }}
          />
        </Stack.Navigator> */}
{/* <WelcomeScreen /> */ }

{/* <Navbar></Navbar> */ }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
// });


{/* <Text numberOfLines={1} onPress={handlepress}>Hi Guies hello </Text>
      <TouchableHighlight onPress={() => { Alert.alert("My tittle", "My message", [{ text: "Yes", onPress: () => console.log("Yes") }, { text: "No", onPress: () => console.log("No") }]) }}>
        <Image
          fadeDuration={1000}
          blurRadius={1}
          source={{
            "width": 100,
            "height": 200,
            uri: "https://picsum.photos/200/300"
          }} />
      </TouchableHighlight>
      <StatusBar style="auto" /> */}

//   <View
//   style={{
//     "backgroundColor": "#fff",
//     "flex": 1
//     // "width": "100%",
//     // height: view === "landscape" ? "100%" : "30%",
//   }}>

// </View>


////////////////////////

{/* <View
        style={{
          "backgroundColor": "#fff",
          "flex": 1,
          "flexDirection": "row",
          "justifyContent": "center",
          "alignItems": "center",
          "alignContent": "center", // only works with wrapping
          // "flexWrap": "wrap" 
        }}>
        <View
          style={{
            "backgroundColor": "dodgerblue",
            // "flexBasis": 500,
            // "flexGrow": 1,
            // "flexShrink": 1,
            "height": "15%",
            "width": "20%",
            // "alignSelf": "flex-end"
          }}>
        </View>
        <View
          style={{
            "backgroundColor": "tomato",
            // "flex": 1
            "height": "15%",
            "width": "20%",
            "top": 20,
          }}>
        </View>

        <View
          style={{
            "backgroundColor": "gold",
            // "flex": 1
            "height": "15%",
            "width": "20%"
          }}>
        </View>
      </View> */}