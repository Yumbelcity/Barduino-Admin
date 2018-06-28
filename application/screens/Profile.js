import React, { Component } from 'react'
import { Alert, AsyncStorage, Text, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { Card, Input } from 'react-native-elements'

export default class Profile extends Component {

  constructor() {
    super()
    this.state = {
      user: {
        name: '',
        age: ''
      }
    }
  }

  componentDidMount() {
    this.fetch()
  }

  updateName = (val) => {
    let state = this.state.user
    this.setState({
      user: Object.assign({}, state, {
        name: val
      })
    })
  }

  updateAge = (val) => {
    let state = this.state.user
    this.setState({
      user: Object.assign({}, state, {
        age: val
      })
    })
  }

  save = async () => {
    try {
      const user = {
        name: this.state.user.name,
        age: this.state.user.age
      }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      Alert.alert('Usuario guardado correctamente')
    } catch (err) {
      Alert.alert(err.message)
    }
  }

  fetch = async () => {
    try {
      let user = await AsyncStorage.getItem('user')
      if (user) {
        let parsed = JSON.parse(user)
        this.setState({ user: parsed })
      }
    } catch (err) {
      Alert.alert('Error obteniendo')
    }
  }

  render() {
    const { user } = this.state
    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <Card>
          <Input
            placeholder='Nombre del usuario'
            shake={true}
            value={user.name}
            onChangeText={(val) => this.updateName(val)}
          />
          <Input
            placeholder='Edad del usuario'
            shake={true}
            value={user.age}
            onChangeText={(val) => this.updateAge(val)}
          />
          <AppButton
            bgColor='rgba(203, 78, 72, 0.9)'
            title='Guardar en local'
            action={this.save}
            iconName='save'
            iconSize={20}
            iconColor='#fff'
          />
        </Card>
      </BackgroundImage>
    )
  }
}