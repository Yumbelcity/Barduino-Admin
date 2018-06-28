import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Alert } from 'react-native'

export default class Logout extends Component {

  componentDidMount() {
    firebase.auth().signOut()
      .then(() => {
        Alert.alert('Has cerrado sesión correctamente')
      })
      .catch(err => {
        Alert.alert(err.message)
      })
  }

  render() {
    return null
  }
}