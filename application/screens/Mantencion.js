import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { NavigationActions } from 'react-navigation'
import * as firebase from 'firebase'
import facebook from '../utils/Facebook'

export default class Mantencion extends Component {

  static navigationOptions = {
    title: 'Mantención'
  }

  cambiarBotella = (botella) => {

    Alert.alert(botella)

    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'login_page'
    // })
    // this.props.navigation.dispatch(navigateAction)
  }

  bombear = () => {

  }

  render() {
    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1, margin: 30, }} >
          <AppButton
            bgColor='rgba(200, 38, 74, 1)'
            title='Cambiar Botella de Pisco'
            action={() => this.cambiarBotella('Pisco')}
            marginBottom={10}
          />
          <AppButton
            bgColor='rgba(200, 38, 74, 1)'
            title='Cambiar Botella de Ron'
            action={() => this.cambiarBotella('Ron')}
            marginBottom={30}
          />
          <AppButton
            bgColor='rgba(37, 157, 255, 0.9)'
            title='Bombear líquido a las mangueras'
            action={this.bombear}
          />
        </View>
      </BackgroundImage>
    )
  }
}