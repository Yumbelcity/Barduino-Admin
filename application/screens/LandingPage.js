import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { NavigationActions } from 'react-navigation'
import * as firebase from 'firebase'
import facebook from '../utils/Facebook'

export default class LandingPage extends Component {

  static navigationOptions = {
    title: 'Bistro Restobar'
  }

  login = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'login_page'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  register = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'register_page'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  async facebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebook.config.application_id,
      { permissions: facebook.config.permissions }
    )

    if (type === 'success') {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credentials)
        .catch(error => {
          Alert.alert(error.message)
        })
    } else if (type === 'cancel') {
      Alert.alert('Inicio de Sesión cancelado')
    } else {
      Alert.alert('Error desconocido')
    }
  }

  render() {
    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1, }} >
          <AppButton
            bgColor='rgba(111, 38, 74, 0.9)'
            title='Entrar'
            action={this.login}
            iconName='sign-in'
            iconSize={20}
            iconColor='#fff'
          />
          <AppButton
            bgColor='rgba(200, 200, 50, 0.9)'
            title='Regístrate'
            action={this.register}
            iconName='user-plus'
            iconSize={20}
            iconColor='#fff'
          />
          <AppButton
            bgColor='rgba(67, 67, 146, 0.9)'
            title='Facebook'
            action={this.facebook}
            iconName='facebook'
            iconSize={20}
            iconColor='#fff'
          />
        </View>
      </BackgroundImage>
    )
  }
}