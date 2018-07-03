import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import PreLoader from '../../components/PreLoader'

export default class PagarPedidos extends Component {

  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    this.state = {
      usuario: params.usuario
    }
  }

  componentDidMount() {
    this.refPedidos = firebase.database().ref().child('pedido').orderByChild('_idUsuario').equalTo(this.state.usuario._idUsuario)
    this.refPedidos.once('value', snapshot => {
      let data = {}
      snapshot.forEach(row => {
        const key = row.key
        data[key] = {}
      })
      firebase.database().ref().child('pedido').update(data)
        .then()
        .catch(err => err.message)
    })
    firebase.database().ref(`usuario/${this.state.usuario._idUsuario}/activado`).set(false)
    const navigateAction = NavigationActions.navigate({
      routeName: 'ListarUsuarios'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    return null
  }

}