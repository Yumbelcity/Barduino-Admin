import React, { Component } from 'react'
import { Alert, Text, View, StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Pedido/SinTragos'
import TragoAddButton from '../../components/Pedido/TragoAddButton'
import { Card, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import PedidoPreparado from '../../components/Pedido/PedidoPreparado'

export default class Preparados extends Component {
  constructor() {
    super()
    this.state = {
      pedidos: [],
      loaded: false
    }

    this.refPedidos = firebase.database().ref().child('pedido').orderByChild('estado').equalTo('preparado')
  }

  componentDidMount() {
    this.refPedidos.on('value', snapshot => {
      let pedidos = []
      snapshot.forEach(row => {
        pedidos.push({
          _idPedido: row.key,
          bebida: row.val().bebida,
          estado: row.val().estado,
          ml: row.val().ml,
          total: row.val().total
        })
      })

      pedidos.reverse()
      this.setState({
        pedidos,
        loaded: true
      })
    })
  }

  restaurantDetail = (pedido) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DetalleTrago',
      params: { pedido }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  eliminarPedido = (pedido) => {
    Alert.alert(
      '¿Eliminar Pedido?',
      'Estás apunto de eliminar este pedido ¿estás seguro?, esta acción es irreversible',
      [
        {
          text: 'Eliminar', onPress: () => {
            this.refPedidos.child(pedido._idPedido).remove()
              .then(() => Alert.alert('OK'))
              .catch(err => {
                Alert.alert(err.message)
              })
          },
          style: 'destructive'
        },
        {
          text: 'Cancelar', style: 'cancel'
        },
      ]
    )
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
          <SinTragos text='No hay Tragos Preparados' />
        </BackgroundImage>
      )
    }
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')} >
        <FlatList
          data={pedidos}
          renderItem={(data) => this.renderPedidos(data.item)}
          ItemSeparatorComponent={() => <View style={{ marginTop: 5 }}></View>}
          keyExtractor={(data) => data._idPedido}
          style={{ marginTop: 15 }}
        />
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  listIconStyle: {
    marginRight: 10,
    fontSize: 15,
    color: 'rgba(255, 38, 74, 0.6)'
  },
  item: {
    padding: 15,
    marginBottom: 2,
    backgroundColor: 'rgba(206, 206, 206, 0.6)',
  }
})