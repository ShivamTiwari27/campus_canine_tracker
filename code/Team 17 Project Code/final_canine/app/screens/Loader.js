import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, SectionList, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Image } from 'react-native'
import PropTypes from "prop-types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
const image = { uri: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' };


export default function Loader(props) {
    const [first, setfirst] = useState("")

    async function comment(name) {
        const token = await AsyncStorage.getItem('token')
        // console.log("Token-----> " + token);
        if (first === "") {
            // alert("Please Enter Some Valid Data");
            return
        }
        fetch("http://192.168.223.29:10000/api/comments", {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                dog_name: name,
                token,
                comment: first,
            }),
        }).then((res) => res.json()).then((data) => {
            if (data.status === "ok") {
                setfirst("")
                // console.log(data.latitude, data.longitude)
                // alert("Data Saved Successful");
            }
            else {
                // alert(data.error);
            }
        });
    }
    const route = useRoute();
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.background}>
            <View style={{ flex: 1, flexDirection: 'column', position: 'relative', justifyContent: 'flex-start' }}>
                <TextInput style={{

                    backgroundColor: '#a6acac',
                    fontWeight: '400px',
                    borderRadius: 50,
                    padding: "7%",
                    paddingTop: "5%",
                    // backgroundColor: '#5C5B80',
                    width: '95%',
                    fontSize: 20,
                    marginTop: '10%',
                    color: '#684d27',
                    height: '20%',
                    marginBottom: '6%',
                    left: '2.5%',

                }}
                    value={first}
                    placeholder="Comment"
                    placeholderTextColor="#684d27"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setfirst}
                >
                </TextInput>
                <TouchableOpacity onPress={() => comment(route.params.name)}>
                    <View style={{ backgroundColor: '#684d27', height: '25%', width: '30%', bottom: '10%', borderRadius: '10%', justifyContent: 'center', left: '33%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '800', fontSize: '23%', }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        // flexDirection:'column',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // bottom: '5%',
    },

});