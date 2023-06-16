import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, SectionList, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Image } from 'react-native'
import PropTypes from "prop-types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '@react-navigation/native';
IP_ADDRESS = '192.168.223.29'
// import {IP_ADDRESS} from './.env';
// const dotenv = require('dotenv');
// const path = require('path');
// const envPath = path.join(__dirname, '.', 'config.env');
// dotenv.config({ path: './config.env' });




export default function Dogs_list(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // console.log(windowHeight, windowWidth)
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const get_dog_list = () => {

        // alert("hii " + (email.split('@')[0]).split('.')[0] + " your Password is " + password);
        fetch(`http://192.168.223.29:10000/api/search_dog_list`, {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
            }),
        }).then((res) => res.json()).then((data) => {
            if (data.status === 'ok') {
                console.log(data.data);
                setData(data.data);
            }
            else if (data.status === 'error') {
                // alert("Dog Data not found");
            }
        });
    }
    useEffect(() => {
        get_dog_list();
    }, [])

    const array = data;
    // const array = ["Dog1","Dog2","Dog3","Dog4","Dog5","Dog6"];


    const len = array.length;
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
            minHeight: '100%',
            backgroundColor: 'rgb(22, 26, 39)',
            position: 'static',
        }}>
            <ScrollView scrollEnabled={true}>
                <View style={{
                    position: 'absolute', top: 40, flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    height: 50,
                    backgroundColor: 'rgba(225,206,255,255)',
                    borderRadius: 20,
                    marginBottom: '6%',
                    marginLeft: '2.5%',
                    width: '95%',
                    position: 'absolute',
                    left: 0,
                }}
                    accessibilityRole='grid'>
                    <FontAwesome style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        name="search" size={25} color="rgba(100,100,100,255)" />
                    <TextInput
                        keyboardAppearance={'dark'}
                        style={{
                            width: '86%',
                            borderRadius: 15,
                            margin: 5,
                            color: '#000',
                            borderColor: '#666',
                            backgroundColor: 'rgba(225,206,255,255)',
                            // borderWidth: 1,
                            height: 45,
                            paddingHorizontal: 0,
                            fontSize: 18,
                            color: "rgba(100,100,100,255)",
                            fontSize: 25,
                        }}
                        value={search}
                        onChangeText={setSearch}
                        placeholder={'Search'}
                        placeholderTextColor={'rgba(100,100,100,255)'}
                    />
                </View>

                <View style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: windowHeight / 10, justifyContent: 'flex-start' }}>
                    {
                        array.filter((value) => {
                            if (search === "") {
                                return true
                            }
                            else {
                                if (value.toLocaleLowerCase().includes(search.toLowerCase())) {
                                    return true
                                }
                                else {
                                    return false
                                }
                            }
                        }).map((person) => {
                            return (
                                <View style={{ marginTop: '8%' }}>
                                    <TouchableOpacity onPress={async (e) => { props.navigation.navigate("Dogs_profile", { name: person }); }}>
                                        <View style={{
                                            backgroundColor: "#23293E", width: windowWidth - 30, height: windowHeight / 11, alignItems: 'center',
                                            justifyContent: 'flex-start', borderRadius: 25, flexDirection: 'row', padding: '2%'
                                        }}>
                                            <Image
                                                style={{ width: 60, height: 60, borderRadius: 60 / 2, marginLeft: '10%' }}
                                                source={{
                                                    uri: 'https://pyxis.nymag.com/v1/imgs/1fa/1b2/4ae76fa8c9910485045e4f9a956345903b-18-puppy-dog-eyes.2x.rhorizontal.w700.jpg'
                                                }}
                                            />
                                            <Text style={{ color: 'white', fontSize: 45, fontWeight: 'bold', color: 'rgb(213, 185, 255)', alignSelf: 'center', marginLeft: windowWidth / 13 }}>{person}</Text>
                                        </View>
                                    </TouchableOpacity >
                                </View>
                            );
                        })}
                </View>
            </ScrollView>
            <View style={{ height: 70 }}>
                <View style={{ flex: 1, flexDirection: 'row', bottom: "8.5%", justifyContent: 'space-evenly', backgroundColor: 'rgb(22, 26, 39)', height: 1, width: '100%', padding: 15 }}>
                    <View style={styles.dogButton}>
                        <TouchableHighlight onPress={async () => { props.navigation.navigate("Dogs_list"); }}>
                            <Text style={styles.dogs} >Dogs</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.mapButton}>
                        <TouchableHighlight onPress={(e) => { props.navigation.navigate("HomePage"); }}>
                            <Text style={styles.maps} >Maps</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.logoutButton}>
                        <TouchableHighlight onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); /*alert("User Logged Out");*/ }}>
                            {/* <TouchableHighlight onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); alert("User Logged Out"); }}> */}
                            <Text style={styles.logout} >Logout</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dogButton: {
        backgroundColor: '#fbff92',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,
        marginRight: '5%',
        justifyContent: 'flex-start',

    },
    mapButton: {
        backgroundColor: '#1b1b1b',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginRight: '5%',
        marginBottom: 10,

    },
    logoutButton: {
        backgroundColor: '#1b1b1b',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,

    },
    dogs: {
        // backgroundColor: 'cyan',
        top: 0,
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: '#1b1b1b'

    },
    maps: {
        // backgroundColor: 'cyan',
        top: 0,
        fontSize: 25,
        // fontWeight: 'bold',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: 'rgba(150,255,180,255)'

    },
    logout: {
        // backgroundColor: 'cyan',
        top: 0,
        fontSize: 25,
        // fontWeight: 'bold',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: '#ff989a'

    },
})