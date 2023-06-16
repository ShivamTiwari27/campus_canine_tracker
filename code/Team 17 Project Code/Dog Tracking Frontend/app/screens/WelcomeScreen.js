import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Image, View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import { global } from 'react';

const image = { uri: 'https://reactjs.org/logo-og.png' };

function WelcomeScreen(props) {
    const [mapRegion, setMapRegion] = useState({
        latitude: 0,
        longitude: 0,
        longitudeDelta: 0.0041,
        latitudeDelta: 0.0021,
        error: null,
        markers: [],
    });
    const [dog_loc, setDog_loc] = useState({
        coords: {
            latitude: 10,
            longitude: 100,
        }
    });
    const [dog_loc_prev, setDog_loc_prev] = useState({
        coords: {
            latitude: 10,
            longitude: 100,
        }
    });

    function update_dog_location(lat, lon) {
        console.log("inside update dog location function");
        // fetch("http://192.168.2.6:10000/api/update_dog_location", {
        fetch("http://10.2.129.200:10000/api/update_dog_location", {
            method: "POST",
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: lon,
            }),
        }).then((res) => res.json()).then((data) => {
            console.log("checker statement");
            if (data.status === "ok") {
                // console.log(data.data);
                console.log("Location Data Updated Successfully");
            }
            else {
                console.log("Location Data Updation Failure");
            }
        });
    }


    useEffect(() => {
    const interval = setInterval(() => {
    // Call your function here
    console.log('Function called');
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let locat = await Location.getCurrentPositionAsync({});
        // setLocation(location);
        if (dog_loc != 0) {
            setDog_loc_prev(dog_loc);
        }
        setDog_loc(locat);
        console.log(dog_loc);
        console.log("dog_loc.coords.latitude = ", dog_loc.coords.latitude)
        console.log("dog_loc_prev.coords.latitude = ", dog_loc_prev.coords.latitude)
        if (dog_loc.coords.latitude - dog_loc_prev.coords.latitude >= 1e-8 || dog_loc.coords.longitude - dog_loc_prev.coords.longitude >= 1e-8)
            update_dog_location(dog_loc.coords.latitude, dog_loc.coords.longitude);
        setMapRegion({
            latitude: locat.coords.latitude,
            longitude: locat.coords.longitude,
            longitudeDelta: 0.0041,
            latitudeDelta: 0.0021,
        })
        { enableHighAccuracy: true }
    })();
    }, 1000); // Change the interval time as per your requirement

    return () => clearInterval(interval);
    });

    function DisplayData() {
        return (
            <SafeAreaView>
                <Text style={{ marginTop: 100, fontSize: 35 }}>{dog_loc.coords.latitude}</Text>
                <Text style={{ marginTop: 100, fontSize: 35 }}>{dog_loc_prev.coords.latitude}</Text>
                <Text style={{ marginTop: 100, fontSize: 35 }}>{dog_loc.coords.longitude}</Text>
                <Text style={{ marginTop: 100, fontSize: 35 }}>{dog_loc_prev.coords.longitude}</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView>
            <DisplayData />
        </SafeAreaView>
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
        top: "-25%",
        width: '100%',
        height: 70,
        backgroundColor: "dodgerblue",
        opacity: 0.8,

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
        top: "-25%",
        width: '100%',
        height: 70,
        backgroundColor: "cyan",
        // backfaceVisibility:'hidden',
        opacity: 0.8,

    },
});
export default WelcomeScreen;
