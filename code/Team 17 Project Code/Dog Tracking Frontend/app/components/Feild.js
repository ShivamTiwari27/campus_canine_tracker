import React from 'react';
import { View, StyleSheet, TextInput, Settings } from 'react-native';


const Feild = (props) => {
    return (

        <TextInput {...props} style={styles.input} underlineColorAndroid="transparent" >
        </TextInput>

    );
}

const styles = StyleSheet.create({
    input: {
        fontWeight: '400px',
        borderRadius: 100,
        backgroundColor: '#5C5B80',
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 20,
        marginBottom: '1%',
        color: 'cyan',
        height: 'auto',
        // padding: '10',
    },
})

export default Feild;
