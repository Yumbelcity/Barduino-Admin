import React, { Component } from 'react'
import { Alert, Text, Image, View } from 'react-native'
import AppButton from '../AppButton'
import * as firebase from 'firebase'

export default class PedidoPreparado extends Component {

  constructor() {
    super()
    this.state = {
      usuario: {}
    }
  }

  componentDidMount() {

    const { pedido } = this.props
    this.refUsuario = firebase.database().ref(`usuario/${pedido._idUsuario}`)

    this.refUsuario.on('value', snapshot => {
      let usuario = {}
      usuario = snapshot.val()
      this.setState({
        usuario
      })
    })
  }

  render() {
    const { pedido } = this.props
    const { usuario } = this.state

    return (
      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: 15, marginBottom: 0, marginTop: 0, borderBottomColor: (pedido.bebida === 'Sprite') ? 'rgba(39, 168, 78, 0.8)' : 'rgba(244, 0, 9, 0.8)', borderBottomWidth: 5 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', margin: 15, marginTop: 0, marginBottom: 0, }}>
          <View style={{ flex: 5 }}>
            <Text style={{ textAlign: 'left', marginTop: 20, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }} >
              {`${usuario.nombre} ${usuario.apellido}`}
            </Text>
            <Text style={{ textAlign: 'left', marginTop: 0, marginBottom: 20, fontSize: 18 }} >
              {`${pedido.estado} | ${pedido.ml} ml`}
            </Text>
          </View>
          <View style={{ flex: 3, justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }} >
              {`$ ${pedido.total}`}
            </Text>
          </View>
        </View>

      </View>
    )
  }
}