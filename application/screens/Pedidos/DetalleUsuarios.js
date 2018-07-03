import React, { Component } from 'react'
import { Alert, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Pedido/SinTragos'
import TragoAddButton from '../../components/Pedido/TragoAddButton'
import { Card, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import PedidoPreparado from '../../components/Pedido/PedidoPreparado'

export default class DetalleUsuarios extends Component {
  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    this.state = {
      usuario: params.usuario,
      pedidos: [],
      total: 0,
      loaded: false
    }

    this.refPedidos = firebase.database().ref().child('pedido').orderByChild('_idUsuario').equalTo(this.state.usuario._idUsuario)
  }

  componentDidMount() {
    this.refPedidos.on('value', snapshot => {
      let pedidos = []
      let total = 0
      snapshot.forEach(row => {
        total = total + parseInt(row.val().total)
        this.setState({ total })
        pedidos.push({
          _idPedido: row.key,
          _idUsuario: row.val()._idUsuario,
          bebida: row.val().bebida,
          estado: row.val().estado,
          ml: row.val().ml,
          total: row.val().total
        })
      })

      this.setState({
        pedidos,
        total,
        loaded: true
      })
    })
  }

  renderPedidos(pedido) {
    return (
      <PedidoPreparado
        pedido={pedido}
      />
    )
  }

  render() {

    const { loaded, pedidos } = this.state

    if (!loaded) {
      return <PreLoader />
    }

    if (!pedidos.length) {
      return (
        <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
          <SinTragos text='No hay Tragos Pedidos' />
        </BackgroundImage>
      )
    }
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')} >
        <ScrollView style={styles.viewStyle}>
          <Text style={styles.title} >{`${this.state.usuario.nombre} ${this.state.usuario.apellido}`}</Text>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 2, marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
          <FlatList
            data={pedidos}
            renderItem={(data) => this.renderPedidos(data.item)}
            ItemSeparatorComponent={() => <View style={{ marginTop: 5 }}></View>}
            keyExtractor={(data) => data._idPedido}
            style={{ marginTop: 15 }}
          />
        </ScrollView>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 3, marginLeft: 50, marginRight: 50, marginTop: 10 }} />
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10, }} >
          <Text style={styles.total} >{`TOTAL: $ ${this.state.total}`}</Text>
        </View>
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  listStyle: {
    marginTop: 5
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  },
  total: {
    color: '#000',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15
  }
})