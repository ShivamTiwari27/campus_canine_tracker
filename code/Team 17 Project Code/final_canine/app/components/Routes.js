import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
// import Home from './Home.js'
// import About from './About.js'
import HomePage from '../screens/HomePage.js'
import Login from '../screens/Login.js'
import Register from '../screens/Register.js'
import WelcomeScreen from '../screens/WelcomeScreen.js'
import Forgot from '../screens/Forgot.js'
import Dogs_list from '../screens/Dogs_list.js'
import Dogs_profile from '../screens/Dogs_profile'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="HomePage" component={HomePage} title="Home" initial={true}/>
            <Scene key="Welcome" component={WelcomeScreen} title="About"/>
            <Scene key="Login" component={Login} title="About"/>
            <Scene key="Register" component={Register} title="About"/>
            <Scene key='Forgot' component={Forgot} title="Forgot" />
            <Scene key='Dogs_list' component={Dogs_list} title="Dogs_list" />
            <Scene key='Dogs_profile' component={Dogs_profile} title="Dogs_profile" />
        </Scene>
    </Router>
)
export default Routes;