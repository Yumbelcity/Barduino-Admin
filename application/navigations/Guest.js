import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import LandingPage from '../screens/LandingPage'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Icon from 'react-native-vector-icons/FontAwesome'

const backIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginLeft: 20 }}
  size={20}
  color='white'
  onPress={() => navigation.navigate('landing_page')}
/>

export default createStackNavigator(
  {
    landing_page: {
      screen: LandingPage
    },
    login_page: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: 'Inicio de Sesión',
        headerLeft: backIcon(navigation, 'arrow-left'),
      })
    },
    register_page: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        title: 'Registro de Usuario',
        headerLeft: backIcon(navigation, 'arrow-left'),
      })
    }
  },
  {
    initialRouteName: 'landing_page',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(200, 38, 74, 1)'
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