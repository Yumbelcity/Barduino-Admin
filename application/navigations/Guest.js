import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import LandingPage from '../screens/LandingPage'
import Login from '../screens/Login'
import Register from '../screens/Register'

export default createStackNavigator(
  {
    landing_page: {
      screen: LandingPage
    },
    login_page: {
      screen: Login
    },
    register_page: {
      screen: Register
    }
  },
  {
    initialRouteName: 'landing_page',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
      },
      headerBackTitleStyle: {
        color: '#fff'
      }
    }
  }
)