import { StyleSheet, Text, View, SafeAreaView, TextInput, SectionList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Image } from 'react-native'
import PropTypes from "prop-types";
import { useRoute } from '@react-navigation/native';
import { Svg, Rect } from 'react-native-svg';
import { ProgressBar } from "rn-multi-progress-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
IP_ADDRESS = '192.168.223.29'
// import {IP_ADDRESS} from './.env';
// const fs= require('fs');
// const dotenv = require('react-native-dotenv');
// // const path = require('path');
// // const envPath = path.join(__dirname, '.', 'config.env');
// // dotenv.config({ path: envPath });
// dotenv.config({ path: './config.env' });


// import PropTypes from "prop-types";
let colour_vote = '#67ec60';
let choice = '0';
export default function Dogs_profile(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [votes, setVotes] = useState({});
    const [votes1, setVotes1] = useState(1);
    const [votes2, setVotes2] = useState(1);
    const [votes3, setVotes3] = useState(1);
    const [user_choice, setUser_choice] = useState("0");
    const [result, setResult] = useState("Docile");
    const [color, setColor] = useState(colour_vote);

    const startReload = () => RNRestart.Restart();
    // console.log(windowHeight, windowWidth)
    // const [data, setData] = useState([]);
    const route = useRoute();
    // const data = [
    //     { label: 'Option A', value: 10 },
    //     { label: 'Option B', value: 20 },
    //     { label: 'Option C', value: 15 },
    // ];
    // const maxValue = Math.max(...data.map(item => item.value));
    // const barHeight = 20;
    // const barWidth = 200;
    const getVotes = (e) => {

        // fetch("http://192.168.223.29:10000/api/get_votes", {
        fetch(`http://192.168.223.29:10000/api/get_votes`, {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                name: route.params.name,
            }),
        }).then((res) => res.json()).then((data) => {
            if (data?.status === "ok") {
                // console.log(data.data);
                setVotes(data.data);
                setVotes1(data.data.friendly);
                setVotes2(data.data.docile);
                setVotes3(data.data.aggressive);
            }
            else {
                // alert(data.error);
            }
        });
    }

    const voting_result = async () => {
        const token = await AsyncStorage.getItem('token')
        fetch(`http://192.168.223.29:10000/api/vote_result`, {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                dog_name: route.params.name,
                token,
            }),
        }).then((res) => res.json()).then((data) => {
            if (data?.status === "ok") {
                console.log(data.voting_result, data.choice, data.colour)
                choice = data.choice
                setResult(data.voting_result);
                setUser_choice(data.choice);
                // setUser_choice(...data.choice);
                setColor(data.colour);
                // setColor(...data.colour);
            }
            else {
                // alert(data.error);
            }
        });
    }
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (reload) {
            // Reload logic here
            setReload(false); // Reset the state variable to false to prevent an infinite loop
        }
    }, [reload]);

    const handleReload = () => {
        setReload(true); // Update the state variable to trigger a reload
    };


    const voting = async (choice) => {
        // console.log("Choices-----> " + choice);
        // alert("hi");
        // e.preventDefault();
        const token = await AsyncStorage.getItem('token')
        // console.log("Token-----> " + token);

        fetch(`http://192.168.223.29:10000/api/vote_choice_insert`, {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                dog_name: route.params.name,
                dog_nature: votes,
                choice,
                token,
            }),
        }).then((res) => res.json()).then((data) => {
            if (data?.status === "ok") {

                // handleReload();
                // RNRestart.Restart();
                // startReload();
                // window.location.reload(false);
                // props.navigation.navigate("Loader", { name: route.params.name });

            }
            else {
                // alert(data.error);
            }
        });
    }

    useEffect(() => {
        getVotes();
        voting_result();

    }, [])



    const Displaybar = () => {
        return (
            <View style={{ backgroundColor: "#23293E", width: windowWidth - windowHeight / 25, marginTop: '5%', borderRadius: 20, flex: 1, justifyContent: 'space-evenly', height: windowHeight / 5 }}>
                <Text style={{ color: 'white', fontSize: 50, float: 'center', textAlign: 'center', marginTop: '0%', fontWeight: '600', fontStyle: 'normal' }}>Results</Text>
                <Text style={{ color: color, textAlign: 'center', fontSize: 40, fontWeight: 600 }}>{result}</Text>
                <View style={{ height: 60 }}>
                    <View style={{ paddingHorizontal: '6%' }}>
                        <ProgressBar
                            barHeight={30}

                            shouldAnimate={true} // to enable animation, default false
                            animateDuration={1000} // if animation enabled
                            data={[
                                { progress: votes2, color: '#67ec60' },
                                { progress: votes1, color: '#92e8ec' },
                                { progress: votes3, color: '#c70256' }
                            ]}

                        />
                    </View>
                </View>
            </View>
        )
    }

    const Display_vote = () => {
        return (
            <View style={{ backgroundColor: "#23293E", width: windowWidth - windowHeight / 25, marginTop: '5%', borderRadius: 20, flex: 1, justifyContent: 'space-evenly', height: windowHeight / 5 }}>
                <Text style={{ color: 'white', fontSize: 50, float: 'center', textAlign: 'center', marginTop: '0%', fontWeight: '600', fontStyle: 'normal' }}>Vote</Text>
                <View style={{ height: 60 }}>
                    {console.log("------------=======------->", user_choice)}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', padding: 12, marginTop: "1%" }}>
                        <View style={{ ...styles.docileButton, backgroundColor: user_choice === '1' ? '#046D1C' : '#4d5980', }}>
                            <TouchableOpacity onPress={() => voting("1")} >
                                <Text style={styles.docile} >Docile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.friendlyButton, backgroundColor: user_choice === '2' ? '#269399' : '#4d5980' }}>
                            <TouchableOpacity onPress={() => voting("2")}>
                                <Text style={styles.friendly} >Friendly</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.aggressiveButton, backgroundColor: user_choice === '3' ? '#520909' : '#4d5980' }}>
                            <TouchableOpacity onPress={() => voting("3")}>
                                <Text style={styles.aggressive} >Aggressive</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    // console.log(votes1, votes2, votes3);
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
                <View style={{ flex: 1, marginTop: '20%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Image
                        style={{ width: windowHeight / 6, height: windowHeight / 6, borderRadius: 100, alignSelf: 'center' }}
                        source={{
                            uri: 'https://pyxis.nymag.com/v1/imgs/1fa/1b2/4ae76fa8c9910485045e4f9a956345903b-18-puppy-dog-eyes.2x.rhorizontal.w700.jpg'
                        }}
                    />
                    <Text style={{ color: '#a6ecff', fontSize: 60, float: 'center', textAlign: 'center', marginTop: '5%', fontWeight: '700', fontStyle: 'normal', fontFamily: "Arial" }}>{route.params.name}</Text>
                    {/* <View style={{ backgroundColor: "#23293E", width: windowWidth - windowHeight / 25, marginTop: '5%', borderRadius: 20, flex: 1, justifyContent: 'space-evenly', height: windowHeight / 5 }}>
                        <Text style={{ color: 'white', fontSize: 50, float: 'center', textAlign: 'center', marginTop: '0%', fontWeight: '600', fontStyle: 'normal' }}>Vote</Text>
                        <View style={{ height: 60 }}>
                            {console.log("------------=======------->", user_choice)}
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', padding: 12, marginTop: "1%" }}>
                                <View style={{ ...styles.docileButton, backgroundColor: user_choice === '1' ? '#046D1C' : '#4d5980', }}>
                                    <TouchableOpacity onPress={() => voting("1")} >
                                        <Text style={styles.docile} >Docile</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ ...styles.friendlyButton, backgroundColor: user_choice === '2' ? '#269399' : '#4d5980' }}>
                                    <TouchableOpacity onPress={() => voting("2")}>
                                        <Text style={styles.friendly} >Friendly</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ ...styles.aggressiveButton, backgroundColor: user_choice === '3' ? '#520909' : '#4d5980' }}>
                                    <TouchableOpacity onPress={() => voting("3")}>
                                        <Text style={styles.aggressive} >Aggressive</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View> */}

                    <Display_vote />
                    <Displaybar />
                </View>
                <View style={{ flexDirection: 'row', bottom: "-9%", position: 'relative', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: '17%' }}>Want to Share Something ?  </Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Loader", { name: route.params.name }); }}>
                        <Text style={{ color: 'cyan', fontSize: '17%' }} >Report</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={{ height: 70 }}>
                <View style={{ flex: 1, flexDirection: 'row', bottom: "8.5%", justifyContent: 'flex-start', backgroundColor: 'rgb(22, 26, 39)', height: 1, width: '100%', padding: 15 }}>
                    <View style={styles.dogButton}>
                        <TouchableOpacity onPress={async () => { props.navigation.navigate("Dogs_list"); }}>
                            <Text style={styles.dogs} >Dogs</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapButton}>
                        <TouchableOpacity onPress={(e) => { props.navigation.navigate("HomePage"); }}>
                            <Text style={styles.maps} >Maps</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutButton}>
                        <TouchableOpacity onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); /*alert("User Logged Out");*/ }}>
                            <Text style={styles.logout} >Logout</Text>
                        </TouchableOpacity>
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
    docile: {
        // backgroundColor: 'cyan',
        top: 3,
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: '#96ffb4'

    },
    friendly: {
        // backgroundColor: 'cyan',
        top: 3,
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: '#a6ecff'

    },
    aggressive: {
        top: -20,
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'normal',
        alignSelf: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // alignSelf: "center",
        position: 'absolute',
        paddingTop: 8,
        color: '#a6ecff',
        color: '#c70256'

    },
    docileButton: {
        // backgroundColor: choice ==='1' ?  '#046D1C' :'#4d5980',
        // backgroundColor: '#046D1C',
        width: 100,
        // flex: 1,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,
        marginRight: '5%',
        justifyContent: 'flex-start',

    },
    friendlyButton: {
        // backgroundColor: '#4d5980',
        // backgroundColor: choice ==='2' ?'#269399':'#4d5980',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginRight: '5%',
        marginBottom: 10,
        // flex: 1,

    },
    aggressiveButton: {
        // backgroundColor: '#4d5980',
        // backgroundColor: choice ==='3' ? '#520909':'#4d5980',
        width: 110,
        height: 50,
        borderRadius: 100,
        // marginBottom: 100,
        // flex: 1,
        alignContent: 'center',
        justifyContent: 'center'

    },
})