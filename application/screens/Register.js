import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { Card } from 'react-native-elements'
//import Toast, {DURATION} from 'react-native-easy-toast'

import t from 'tcomb-form-native'
const Form = t.form.Form
import FormValidation from '../utils/Validation'

import * as firebase from 'firebase'

export default class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: ''
      }
    }

    this.samePassword = t.refinement(t.String, (s) => {
      return s === this.state.user.password
    })

    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password,
      password_confirmation: this.samePassword

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
        },
        password_confirmation: {
          help: 'Repite tu Contraseña',
          error: 'Las contraseñas no coinciden',
          password: true,
          secureTextEntry: true
        }
      }
    }

    this.validate = null

  }

  register = () => {
    if (this.validate) {
      firebase.auth().createUserWithEmailAndPassword(
        this.validate.email, this.validate.password
      )
        .then(() => {
          Alert.alert('Registro Correcto, Binvenido')
        })
        .catch(err => {
          Alert.alert(err.message)
        })
    }
  }

  onChange(user) {
    this.setState({ user })
    this.validate = this.refs.form.getValue()
  }

  render() {
    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Card wrapperStyle={{ paddingLeft: 10 }} title='Regístrate'>
            <Form
              ref='form'
              type={this.user}
              options={this.options}
              onChange={(v) => this.onChange(v)}
              value={this.state.user}
            />
            <AppButton
              bgColor='rgba(200, 200, 50, 0.9)'
              title='Registrarme'
              action={this.register}
              iconName='user-plus'
              iconSize={30}
              iconColor='#fff'
            />
          </Card>
        </View>
      </BackgroundImage>
    )
  }
}