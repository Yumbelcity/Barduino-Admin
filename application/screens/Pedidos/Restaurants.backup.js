import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Pedido/SinTragos'
import TragoAddButton from '../../components/Pedido/TragoAddButton'
import Trago from '../../components/Pedido/Trago'
import { Card, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export default class Restaurants extends Component {
  constructor() {
    super()
    this.state = {
      tragos: [],
      loaded: false,
      restaurant_logo: require('../../../assets/images/avatar.png')
    }

    this.refTragos = firebase.database().ref().child('trago')
  }

  componentDidMount() {
    this.refTragos.on('value', snapshot => {
      let tragos = []
      snapshot.forEach(row => {
        tragos.push({
          _idTrago: row.key,
          nombreTrago: row.val().nombreTrago,
          precio: row.val().precio,
          imagePath: row.val().imagePath,
          marca: row.val().marca,
          grado: row.val().grado,
          ml: row.val().ml
        })
      })

      this.setState({
        tragos,
        loaded: true
      })
    })
  }

  addTrago = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AddTrago'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  restaurantDetail = (trago) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DetalleTrago',
      params: { trago }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  personalizarTrago = (trago) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PersonalizarTrago',
      params: { trago }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  pedirBlanca = () => {

  }

  pedirNegra = () => {

  }

  renderTragos(trago) {
    return (
      <Trago
        pedirBlanca={this.pedirBlanca}
        pedirNegra={this.pedirNegra}
        personalizarTrago={() => this.personalizarTrago(trago)}
        trago={trago}
      />
    )
  }

  render() {
    const { loaded, tragos } = this.state

    //

    this.refPedidos = firebase.database().ref().child('pedido').orderByChild('estado').equalTo('pendiente').limitToFirst(1)
    this.refPedidos.once('value', snapshot => {
      snapshot.forEach(row => {
        const estado = row.val().estado
        console.log(String(estado))
      })
    })

    //

    if (!loaded) {
      return <PreLoader />
    }

    if (!tragos.length) {
      return (
        <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
          <SinTragos text='No hay Tragos Disponibles' />
          <TragoAddButton addTrago={this.addTrago} />
        </BackgroundImage>
      )
    }
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')} >
        <FlatList
          data={tragos}
          renderItem={(data) => this.renderTragos(data.item)}
          keyExtractor={(data) => data._idTrago}
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