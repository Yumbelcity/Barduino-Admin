import React, { Component } from 'react'
import { Alert, Text, Image, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import AppButton from '../AppButton'

export default class Usuario extends Component {

  render() {
    const { usuario, toggleActivado, pedidosUsuario } = this.props

    return (
      <View style={{ backgroundColor: usuario.activado ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)', margin: 15, marginBottom: 0, marginTop: 0 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', margin: 15, marginTop: 0, marginBottom: 0, }}>
          <View style={{ flex: 7 }}>
            <Text style={{ textAlign: 'left', marginTop: 20, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }} >
              {`${usuario.nombre} ${usuario.apellido}`}
            </Text>
            <Text onPress={pedidosUsuario} style={{ textAlign: 'left', marginTop: 5, marginBottom: 20, fontSize: 16, color: 'gray' }} >
              {`detalle >`}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={usuario.activado}
              onPress={toggleActivado}
              checkedColor='green'
              uncheckedColor='red'
            />
          </View>
        </View>

      </View>
    )
  }
}