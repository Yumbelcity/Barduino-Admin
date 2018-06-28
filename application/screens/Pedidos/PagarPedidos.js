import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class PagarPedidos extends Component {

  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    this.state = {
      usuario: params.usuario
    }
    this.refPedidos = firebase.database().ref().child('pedido').orderByChild('_idUsuario').equalTo(this.state.usuario._idUsuario)
  }

  componentDidMount() {
    const pedido = this.refPedidos.child('pedido')
    console.log(pedido)
    navigation.navigate('ListarUsuarios'))
  }

  render() {
    return null
  }

}