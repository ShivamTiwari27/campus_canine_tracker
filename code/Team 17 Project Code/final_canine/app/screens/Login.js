import React from 'react';
import { ImageBackground, SafeAreaView, TouchableHighlight, KeyboardAvoidingView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { useImageDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import Feild from '../components/Feild';
import Background from '../assets/gog.jpeg';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forgot from './Forgot';
import Navbar from '../components/navbar';
import { Linking } from 'react-native';
// import { Navbar } from 'react-bootstrap';
// import Routes from '../components/Routes';
// import { Storage } from 'expo-storage';


function Login(props) {
    const view = useDeviceOrientation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [storage, setStorage] = useState('');
    const [token, setToken] = useState('');

    const pushData = async (token1) => {
        await AsyncStorage.setItem('token', token1);
        await AsyncStorage.setItem('isLoggedIn', "true");
        // alert(token1);
    }

    const handleLogin = async (e) => {
        console.log("123")
        // e.preventDefault();
        // alert("hii " + (email.split('@')[0]).split('.')[0] + " your Password is " + password);
        fetch("http://192.168.223.29:10000/api/login", {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((res) => res.json()).then((data) => {
            // console.log(data);
            // console.log(data, "user Registered")
            if (data.status === "ok") {
                pushData(data.token);
                // AsyncStorage.setItem('token',data.token);
                // alert("Logged In Sucessfully");

                // setToken(data.token);

                props.navigation.navigate("HomePage");
            }
            else if (data.status === 'error') {
                alert('Invalid credentials')
                setEmail('');
                setPassword('');
            }
            else {
                // alert(data.error);
            }
        });
    }
    const CAS = async () => {
        Linking.openURL("http://localhost:8080/api/cas_login/cas")
    }

    const Stack = createNativeStackNavigator();
    const screenHeight = Dimensions.get('window').height;

    return (


        // <KeyboardAvoidingView style={{flex:1}} behavior={"padding"}>
        <KeyboardAvoidingView
            behavior='padding'
            contentContainerStyle={{ minHeight: screenHeight }}
            style={{ backgroundColor: '#FFFFFF', flex: 1 }}
            keyboardVerticalOffset={-100}>
            <View style={styles.background}>
                <View style={styles.container}>
                    {/* <View style={styles.loginText1}> */}
                    {/* </View> */}
                    <View style={styles.loginForm}>
                        <Text style={styles.loginText}>Pup Patrol</Text>
                        {/* <Text style={{ fontSize: 40, fontWeight: 'bold', fontStyle: 'normal', color: 'white' }}>Welcome Back</Text> */}
                        {/* <Text style={{ fontSize: 19, fontWeight: 'bold', fontStyle: 'normal', color: 'grey', marginBottom: 20 }}>Login to your Account</Text> */}

                        <View style={styles.searchSection}>
                            <FontAwesome style={styles.searchIcon} name="user-o" size={30} color="rgb(213, 185, 255)" />
                            <Feild style={styles.feild} placeholder='Email Id' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setEmail}></Feild>
                        </View>

                        <View style={styles.searchSection}>
                            <FontAwesome style={styles.searchIcon} name="lock" size={30} color="rgb(213, 185, 255)" />
                            <Feild placeholder='Password' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setPassword} secureTextEntry={true}></Feild>
                        </View>
                        <View style={styles.loginButton}>
                            <TouchableHighlight onPress={(e) => handleLogin(e)}>
                                <Text style={styles.loginText2} >Login</Text>
                            </TouchableHighlight>
                        </View>
                        {/* <View style={styles.loginButton}>
                            <TouchableHighlight onPress={CAS}>
                                <Text style={styles.loginText2} >CAS</Text>
                            </TouchableHighlight>
                        </View> */}

                        <TouchableOpacity onPress={async () => { props.navigation.navigate("Forgot"); }}>
                            <Text style={styles.loginText1} >Forgot Password</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', bottom: "-30%" }}>
                            <Text style={{ color: 'grey' }}>Don't Have an Account </Text>
                            <TouchableHighlight onPress={async () => { props.navigation.navigate("Register"); }}>
                                <Text style={styles.loginText1} >Register</Text>
                            </TouchableHighlight>
                        </View>


                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
        // </KeyboardAvoidingView> 


    );

}

export default Login;

const styles = StyleSheet.create({
    searchSection: {
        // flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 60,
        backgroundColor: '#5C5B80',
        borderRadius: 25,
        marginBottom: '6%',
        width: '90%',
    },
    searchIcon: {
        padding: 10,
        alignItems: 'center',
        // position: 'absolute',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 60,
        fontWeight: 900,
        // textAlign: 'center',
        // textDecorationLine: 'underline',
        // fontFamily: 'Cochin',
        position: 'relative',
        // right: -200,
        left: 0,
        top: -30,
        height: 'auto',

    },
    loginText1: {
        // top: 0,
        position: 'relative',
        marginTop: '1%',
        textAlign: 'center',
        color: 'cyan'

    },
    feild: {
        // color: "rgb(213, 185, 255)",
        backgroundColor: 'red',
        background: '#000000d0'
    },
    loginText2: {
        // backgroundColor: 'cyan',
        top: 0,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,

    },
    loginForm: {
        flex: 1,
        justifyContent: 'flex-start',
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        position: "relative",
        // backgroundColor: '#000000d0',
        width: '100%',
        alignItems: 'center',
        height: Platform.OS === 'android' ? '50%' : '50%',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center',

    },
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    button: {
        backgroundColor: 'cyan',

    },
    loginButton: {
        backgroundColor: 'cyan',
        width: 200,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        minHeight: '100%',
        backgroundColor: 'rgb(22, 26, 39)',
        position: 'static',

        // bottom: '5%',
    },
});
