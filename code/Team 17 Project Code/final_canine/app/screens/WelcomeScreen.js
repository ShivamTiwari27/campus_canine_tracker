import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Image, View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/navbar';
const image = { uri: 'https://reactjs.org/logo-og.png' };

function WelcomeScreen(props) {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const DisplayData = async () => {
        try {
            let isLoggedIn1 = await AsyncStorage.getItem('isLoggedIn');
            let isTrueSet = (isLoggedIn1 === 'true');

            setisLoggedIn(isTrueSet);
            if (isTrueSet) {
                props.navigation.navigate("HomePage")
            }
        }
        catch (error) {
            // alert(error);
        }
    }
    useEffect(() => {
        DisplayData();
    }, []);


    return (
        <ImageBackground source={require("../assets/background.webp")} resizeMode="cover" style={styles.background}>
            {/* <Navbar></Navbar> */}
            <View style={styles.imageContainer}>
                <Image source={require('../assets/gog.jpeg')} style={styles.image} />
                <Text style={styles.text}>Canine Tracking App</Text>
            </View>

            <View style={styles.loginButton}>
                <TouchableHighlight onPress={() => props.navigation.navigate("Login")}>
                    <Text style={styles.logintext}>Login</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.registerButton}>
                <TouchableHighlight onPress={() => props.navigation.navigate("Register")}>
                    <Text style={styles.text}>Register</Text>
                </TouchableHighlight>
            </View>
            {/* <View style={styles.registerButton}>
                <TouchableHighlight onPress={() => props.navigation.navigate("HomePage")}>
                    <Text style={styles.text}>HomePage</Text>
                </TouchableHighlight>
            </View>  */}
        </ImageBackground>



    );
}

//rnss
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // bottom: '5%',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    imageContainer: {
        width: "100%",
        position: "absolute",
        top: 70,
        alignItems: "center",

    },
    text: {
        width: "100%",
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#000000a0',
        backgroundColor: "#442279a0",
    },
    loginButton: {
        top:"-25%",
        width: '100%',
        height: 70,
        backgroundColor: "dodgerblue",
        opacity:0.8,

    },
    logintext: {
        width: "100%",
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#000000a0',
        // backgroundColor: "#442279a0",
    },
    registerButton: {
        top:"-25%",
        width: '100%',
        height: 70,
        backgroundColor: "cyan",
        // backfaceVisibility:'hidden',
        opacity:0.8,

    },
});
export default WelcomeScreen;
