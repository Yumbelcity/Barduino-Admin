import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import t from 'tcomb-form-native'
import FormValidation from '../utils/Validation'
import { Card } from 'react-native-elements'
import * as firebase from 'firebase'
// import Toast from 'react-native-simple-toast'
import Toast, {DURATION} from 'react-native-easy-toast'

const Form = t.form.Form

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password
    })

    this.options = {
      fields: {
        email: {
          help: 'Introduce tu Email',
          error: 'Email incorrecto',
          autoCapitalize: 'none'
        },
        password: {
          help: 'Introduce tu Contraseña',
          error: 'Contraseña incorrecta',
          password: true,
          secureTextEntry: true
        }
      }
    }
  }

  login = () => {
    const validate = this.refs.form.getValue()
    if (validate) {
      firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          Alert.alert('Bienvenido')
          // Toast.showWithGravity('Bienvenido', Toast.LONG, Toast.BOTTOM)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            // Toast.showWithGravity('Contraseña incorrecta', Toast.LONG, Toast.BOTTOM)
            Alert.alert('Password Incorrecto')
          } else {
            // Toast.showWithGravity(errorCode, Toast.LONG, Toast.BOTTOM)
            Alert.alert(errorMessage)
          }
        })
    } /*else {
      Alert.alert('fail')
    }*/
  }

  render() {
    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Card wrapperStyle={{ padding: 10 }} title='Iniciar Sesión'>
            <Form
              ref='form'
              type={this.user}
              options={this.options}
            />
            <AppButton
              bgColor='rgba(111, 38, 74, 0.7)'
              title='Login'
              action={this.login}
              iconName='sign-in'
              iconSize={20}
              iconColor='#fff'
            />
          </Card>
        </View>
      </BackgroundImage>
    )
  }
}

