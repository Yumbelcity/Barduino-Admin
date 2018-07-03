import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import PreLoader from './application/components/PreLoader'
import firebaseConfig from './application/utils/Firebase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)
import GuestNavigation from './application/navigations/Guest'
import LoggedNavigation from './application/navigations/Logged'
import { RectButton } from 'react-native-gesture-handler';

console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isLogged: false,
      loaded: false,
    }
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
        })
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        })
      }
    })
  }

  render() {
    const { isLogged, loaded } = this.state

    if (!loaded) {
      return <PreLoader />
    }

    if (isLogged) {
      return (<LoggedNavigation />)
    } else {
      return (<GuestNavigation />)
    }
  }

}