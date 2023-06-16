import { useEffect, useState } from 'react'
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Tab, TouchableHighlight } from 'react-native';
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

const Forgot = (props) => {
    const isFocused = useIsFocused();
    return (
        <SafeAreaView>
            <Text>Forgot Password No issue </Text>
            <View>
                    <Text >Forgot</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Forgot;
