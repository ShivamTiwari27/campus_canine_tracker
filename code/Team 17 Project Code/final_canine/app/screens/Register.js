
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { ImageBackground, SafeAreaView, TextInput, TouchableHighlight, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import Feild from '../components/Feild';
import { StatusBar } from 'react-native';
import { useImageDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Register(props) {
    const view = useDeviceOrientation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [locality, setLocality] = useState('');
    const pushData = async (token1) => {
        await AsyncStorage.setItem('token', token1);
        await AsyncStorage.setItem('isLoggedIn', "true");
        // alert(token1);
    }
    const handleRegister = (e) => {
        // alert("hi");[]
        // e.preventDefault();
        fetch("http://192.168.223.29:10000/api/auth", {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Age: age,
                Password: password,
                Locality: locality,
            }),
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            console.log(data, "user Registered")
            if (data.status === "ok") {
                pushData(data.token);
                // alert("Resgistered Successfully");
                props.navigation.navigate("HomePage")
            }
            else {
                // alert(data.error);
            }
        });
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('email' + password);
    //     }, 1000);
    // });
    const screenHeight = Dimensions.get('window').height;
    // console.log(email);
    return (
        <KeyboardAvoidingView
            behavior='padding'
            contentContainerStyle={{ minHeight: screenHeight }}
            style={{ backgroundColor: '#FFFFFF', flex: 1 }}
            keyboardVerticalOffset={-100}
        >
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
                            <FontAwesome style={styles.searchIcon} name="edit" size={30} color="rgb(213, 185, 255)" />
                            <Feild style={styles.feild} placeholder='Name' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setName}></Feild>
                        </View>
                        <View style={styles.searchSection}>
                            <FontAwesome style={styles.searchIcon} name="lock" size={30} color="rgb(213, 185, 255)" />
                            <Feild placeholder='Password' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setPassword} secureTextEntry={true}></Feild>
                        </View>
                        {/* <View style={styles.searchSection}>
                        <FontAwesome style={styles.searchIcon} name="blind" size={30} color="rgb(213, 185, 255)" />
                        <Feild placeholder='Age' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setAge}></Feild>
                        </View> */}
                        <View style={styles.searchSection}>
                            <FontAwesome style={styles.searchIcon} name="location-arrow" size={30} color="rgb(213, 185, 255)" />
                            <Feild placeholder='Locality' placeholderTextColor='rgb(213, 185, 255)' onChangeText={setLocality}></Feild>
                        </View>
                        <View style={styles.loginButton}>
                            <TouchableOpacity onPress={(e) => handleRegister(e)}>
                                <Text style={styles.loginText2} >Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', bottom: "-20%" }}>
                            <Text style={{ color: 'grey' }}>Already Have an Account ? </Text>
                            <TouchableHighlight onPress={async () => { props.navigation.navigate("Login"); }}>
                                <Text style={styles.loginText1} >Login</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Register;

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
        top: -70,
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
        backgroundColor: 'cyan',
        top: 0,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        // borderRadius: 100,
        // position: 'absolute',
        paddingTop: 7,

    },
    loginForm: {
        bottom: '15%',
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
        flexDirection: 'column',
        top: '-20%'
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
        backgroundColor: 'rgb(22, 26, 39)'

        // bottom: '5%',
    },
})