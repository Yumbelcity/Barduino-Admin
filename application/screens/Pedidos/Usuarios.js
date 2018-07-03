import React, { Component } from 'react'
import { Alert, Text, ScrollView, View, StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Pedido/SinTragos'
import TragoAddButton from '../../components/Pedido/TragoAddButton'
import { Card, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import Usuario from '../../components/Pedido/Usuario'

export default class Usuarios extends Component {
  constructor() {
    super()
    this.state = {
      usuariosActivados: [],
      usuariosDesactivados: [],
      loaded: false
    }

    this.refUsuarios = firebase.database().ref().child('usuario').orderByChild('logueado').equalTo(true)
  }

  componentDidMount() {
    this.refUsuarios.on('value', snapshot => {
      let usuariosActivados = []
      let usuariosDesactivados = []
      snapshot.forEach(row => {
        if (row.val().activado) {
          usuariosActivados.push({
            _idUsuario: row.key,
            nombre: row.val().nombre,
            apellido: row.val().apellido,
            logueado: row.val().logueado,
            activado: row.val().activado,
          })
        } else {
          usuariosDesactivados.push({
            _idUsuario: row.key,
            nombre: row.val().nombre,
            apellido: row.val().apellido,
            logueado: row.val().logueado,
            activado: row.val().activado,
          })
        }
      })

      this.setState({
        usuariosActivados,
        usuariosDesactivados,
        loaded: true
      })
    })
  }

  pedidosUsuario = (usuario) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PedidosUsuario',
      params: { usuario }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  toggleActivado = (usuario) => {
    const ref = firebase.database().ref(`usuario/${usuario._idUsuario}`).child('activado')
    ref.set(!usuario.activado)
  }

  renderUsuarios(usuario) {
    return (
      <Usuario
        toggleActivado={() => this.toggleActivado(usuario)}
        pedidosUsuario={() => this.pedidosUsuario(usuario)}
        usuario={usuario}
      />
    )
  }

  render() {

    const { loaded, usuariosActivados, usuariosDesactivados } = this.state

    if (!loaded) {
      return <PreLoader />
    }

    if (!usuariosActivados.length && !usuariosDesactivados.length) {
      return (
        <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
          <SinTragos text='No hay Usuarios' />
        </BackgroundImage>
      )
    }
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')} >
        <ScrollView style={styles.viewStyle}>
          <Text style={styles.title} >Usuarios Activados</Text>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 2, marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
          <FlatList
            data={usuariosActivados}
            renderItem={(data) => this.renderUsuarios(data.item)}
            ItemSeparatorComponent={() => <View style={{ marginTop: 5 }}></View>}
            keyExtractor={(data) => data._idUsuario}
            style={styles.listStyle}
          />
          <Text style={styles.title} >Usuarios Desactivados</Text>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 2, marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
          <FlatList
            data={usuariosDesactivados}
            renderItem={(data) => this.renderUsuarios(data.item)}
            ItemSeparatorComponent={() => <View style={{ marginTop: 5 }}></View>}
            keyExtractor={(data) => data._idUsuario}
            style={styles.listStyle}
          />
        </ScrollView>
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  listStyle: {
    marginTop: 5,
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  }
})