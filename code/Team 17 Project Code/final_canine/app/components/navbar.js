import { useEffect, useState } from 'react'
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Tab } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from 'react-native-navbar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from '../screens/WelcomeScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import HomePage from '../screens/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forgot from '../screens/Forgot';
// import Routes from './Routes';


const styles = {
    container: {
        flex: 1,
    },
};


function Navbar() {
    //    let str="HomePage"
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const DisplayData = async () => {
        try {
            let isLoggedIn1 = await AsyncStorage.getItem('isLoggedIn');
            let isTrueSet = (isLoggedIn1 === 'true');
            // if(isTrueSet)
            // {
            //     str="Welcome"
            // }
            setisLoggedIn(isTrueSet);
        }
        catch (error) {
            // alert(error);
        }
    }
    useEffect(() => {
        DisplayData();
    }, []);

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    return (



        // <NavigationContainer>
        <Tab.Navigator
            initialRouteName={Login}
            // screenOptions={({ route } ) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName;
            //         let rn = route.name;
            //         // console.log('0');

            //         if (rn === "Welcome") {
            //             // console.log('1');
            //             iconName = focused ? 'home' : 'home-outline';
            //         }
            //         else if (rn === "Register") {
            //             // console.log('2');
            //             iconName = focused ? 'list' : 'list-outline';

            //         }
            //         else if (rn === "Login") {
            //             // console.log('3');
            //             iconName = focused ? 'settings' : 'settings-outline';
            //         }
            //         // else if (rn === "HomePage") {
            //         //     iconName = focused ? 'settings' : 'settings-outline';
            //         // }
            //         else {
            //             // console.log('4');
            //             iconName = focused ? 'list' : 'list-outline';
            //         }
            //         // You can return any component that you like here!
            //         return <Ionicons name={iconName} size={size} color={color} />;
            //     },

            // })}
            screenOptions={{
                "headerShown": false,
                "tabBarActiveTintColor": "tomato",
                "tabBarInactiveTintColor": "grey",
                "tabBarLabelStyle": {
                    "paddingBottom": 10,
                    "fontSize": 10
                },

                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
        >

            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="Login" component={Login} />
            {/* <Tab.Screen name="Forgot" component={Forgot} /> */}
            <Tab.Screen name="HomePage" component={HomePage} listeners={{
                tabPress: e => {

                    // Prevent default action
                    // e.preventDefault();
                },
            }} />
            {/* {isLoggedIn ? <Tab.Screen name="HomePage1" component={HomePage} /> : <Tab.Screen name="Welcome1" component={WelcomeScreen} />} */}

            {/* {console.log("Hey There 64")} */}
            {/* <NavbarHomeicon /> */}

        </Tab.Navigator>
        // </NavigationContainer>

    );

}
export default Navbar;