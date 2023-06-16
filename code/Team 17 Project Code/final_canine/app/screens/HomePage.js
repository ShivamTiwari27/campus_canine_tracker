import { useEffect, useState } from 'react'
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Tab, TouchableHighlight, TextInput, useColorScheme, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from 'react-native-navbar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './WelcomeScreen';
import Register from './Register';
import Login from './Login';
import Navbar from '../components/navbar';
import { useIsFocused } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import PropTypes from "prop-types";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Image } from 'react-native'


// import { Row } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const homeName = "WelcomeScreen";
const location_coords = [
    {
        "name": "bakul",
        "latitude": 17.44815,
        "longitude": 78.34830
    },
    {
        "name": "parijaat",
        "latitude": 17.44527,
        "longitude": 78.34930
    },
    {
        "name": "vc",
        "latitude": 17.44626,
        "longitude": 78.34911
    },
    {
        "name": "kcis",
        "latitude": 17.44536,
        "longitude": 78.34960
    },
    {
        "name": "obh",
        "latitude": 17.44604,
        "longitude": 78.34595
    },
    {
        "name": "jc",
        "latitude": 17.44597,
        "longitude": 78.34702
    },
    {
        "name": 'football ground',
        "latitude": 17.44692,
        "longitude": 78.34845,
    }
]
// const detailsName = "Details";
// const settingsName = "Settings";
function CustomMarker() {
    return (
        <View style={styles.marker}>
            <Image
                style={{ width: windowHeight / 30, height: windowHeight / 30, borderRadius: 100, alignSelf: 'center' }}
                source={{
                    uri: 'https://pyxis.nymag.com/v1/imgs/1fa/1b2/4ae76fa8c9910485045e4f9a956345903b-18-puppy-dog-eyes.2x.rhorizontal.w700.jpg'
                }}
            />
            {/* <Text style={styles.color}>Tokyo</Text> */}
        </View>
    );
}

const HomePage = (props) => {
    let color = useColorScheme();
    const isFocused = useIsFocused();
    const [search, setsearch] = useState("");
    const [mapRegion, setMapRegion] = useState({
        latitude: 0,
        longitude: 0,
        longitudeDelta: 0.0041,
        latitudeDelta: 0.0021,
        error: null,
        markers: [],
    });
    const [dog_location, setDog_location] = useState({
        latitude: 0,
        longitude: 0,
        longitudeDelta: 0.0041,
        latitudeDelta: 0.0021,
        error: null,
        markers: [],
    });
    const [location, setLocation] = useState(0);
    const [errorMsg, setErrorMsg] = useState(0);
    // const {markers, polygons} = useMapStore();


    const OverlayComponent = () => (
        <View
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: '100%',
                opacity: 0.5,
                zIndex: 1,
                backgroundColor: 'rgba(1,2,1,1)',
            }}
        >

        </View>
    );
    const DogLocation = () => {
        // console.log("123")
        fetch("http://192.168.223.29:10000/api/get_dog_location", {
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
            if (data.status === "ok") {
                // console.log(data.latitude, data.longitude)
                setDog_location({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    longitudeDelta: 0.0041,
                    latitudeDelta: 0.0021,
                })
            }
            else {
                // alert(data.error);
            }
        });
    }
    const DisplayData = () => {
        try {
            AsyncStorage.getItem('isLoggedIn').then((e) => {
                // console.log(isLoggedIn1 + ' yes ' + e);
                // let isTrueSet = (isLoggedIn1 === 'true');
                if (!e) {
                    props.navigation.navigate("Welcome");
                    // console.log(isTrueSet + " 1")
                }
                else {
                    // console.log(isTrueSet + " 2")
                    props.navigation.navigate("HomePage");
                }
            });


            // console.log(user);
        }
        catch (error) {
            // alert(error);
        }
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: 0.0041,
                latitudeDelta: 0.0021,
            })
            { enableHighAccuracy: true }
        })();
    }, []);

    useEffect(() => {
        DisplayData();
    }, []);

    useEffect(() => {
        DogLocation();
        // console.log(dog_location);
    });


    // let obj = {};
    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);


    // obj = {
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     longitudeDelta: 0.0421,
    //     latitudeDelta: 0.0922,
    // }
    // setMapRegion(obj);


    // text = JSON.stringify(location);
    // }
    return (
        <View style={styles.container}>

            <MapView style={styles.map} region={mapRegion} showsCompass={true}
                tooltip={true}
                showsUserLocation={true}
                rotateEnabled={true}
                // loadingEnabled={true}
                userInterfaceStyle="dark">
                <Marker coordinate={{
                    latitude: dog_location.latitude ? dog_location.latitude : 0,
                    longitude: dog_location.longitude ? dog_location.longitude : 0,
                }}>
                    <CustomMarker />
                </Marker>

            </MapView>
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
                left: 0
            }}>
                <FontAwesome style={{
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    name="search" size={25} color="rgba(100,100,100,255)" />
                <TextInput
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
                    placeholder={'Search'}
                    placeholderTextColor={'rgba(100,100,100,255)'}
                />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', position: 'relative', marginTop: '-20%', justifyContent: 'space-evenly' }}>
                <View style={styles.dogButton}>
                    <TouchableHighlight onPress={async () => { props.navigation.navigate("Dogs_list"); }}>
                        <Text style={styles.dogs} >Dogs</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.mapButton}>
                    <TouchableHighlight onPress={(e) => { }}>
                        <Text style={styles.maps} >Maps</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.logoutButton}>
                    <TouchableHighlight onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); /*alert("User Logged Out");*/ }}>
                        <Text style={styles.logout} >Logout</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {/* <View style={{flex:1/4,alignItems:'center', borderRadius:100}}>
                    <TouchableHighlight onPress={async () => {props.navigation.navigate("Dogs_list"); }}>
                        <Text style={{backgroundColor: 'grey',fontSize:30,padding:10}}>Dogs</Text>
                    </TouchableHighlight>
                </View>
                <View  style={{flex:1/4,alignItems:'center', borderRadius:100}}>
                    <TouchableHighlight onPress={async () => {props.navigation.navigate("HomePage"); }}>
                        <Text style={{backgroundColor: '#96ffb4',fontSize:30,padding:10}}>Map</Text>
                    </TouchableHighlight>
                </View>
                <View  style={{flex:1/4,alignItems:'center', borderRadius:100}}>
                    <TouchableHighlight onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); alert("User Logged Out"); }}>
                        <Text style={{backgroundColor: 'grey',fontSize:30,padding:10}}>Logout</Text>
                    </TouchableHighlight>
                </View> */}
            {/* <Marker
                coordinate={{
                    latitude: mapRegion.latitude ? mapRegion.latitude : 0,
                    longitude: mapRegion.longitude ? mapRegion.longitude : 0,
                }}
                title="Title"
                description={"Desc"}
                draggable={true}
            />
            <Circle /> */}
            {/* <OverlayComponent /> */}
        </View>
        // <SafeAreaView>
        //     <Text>Welcome To Map Page</Text>
        //     <View>
        //         {/* <TouchableHighlight onPress={async() =>{await AsyncStorage.clear() ; props.navigation.navigate("WelcomeScreen");alert("User Logged Out");}}> */}
        //         <TouchableHighlight onPress={async () => { await AsyncStorage.setItem('isLoggedIn', 'false'); props.navigation.navigate("Welcome"); alert("User Logged Out"); }}>
        //             <Text >Logout</Text>
        //         </TouchableHighlight>
        //     </View>
        //     {/* <Navbar></Navbar> */}
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        background: '#107B67',
    },
    dogs: {
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
        color: '#fbff92'

    },
    maps: {
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
        color: '#161a27'

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
    dogButton: {
        backgroundColor: '#161a27',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,
        justifyContent: 'flex-start',

    },
    mapButton: {
        backgroundColor: 'rgba(150,255,180,255)',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,

    },
    logoutButton: {
        backgroundColor: '#161a27',
        width: 100,
        height: 50,
        borderRadius: 100,
        marginBottom: 10,

    },
    marker: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        // backgroundColor: "#007bff",
        borderColor: "#eee",
        borderRadius: 5,
        elevation: 10,
    },
    text: {
        color: "#fff",
    },
})
HomePage.defaultProps = {
    markers: [],
};

HomePage.propTypes = {
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            name: PropTypes.string,
        })
    ),
};
export default HomePage;
