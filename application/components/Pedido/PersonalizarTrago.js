import React, { Component } from 'react'
import { Alert, Image, Text, Slider, View } from 'react-native'
import { Card } from 'react-native-elements'
import AppButton from '../AppButton'
import * as firebase from 'firebase'

export default class PersonalizarTrago extends Component {

  constructor(props) {
    super(props)
    const { trago } = this.props
    this.state = {
      sliderValue: 60,
      total: trago.precio,
      pedido: {
        _idTrago: trago._idTrago,
        ml: 60,
        bebida: '',
        estado: '',
        total: 0
      }
    }
  }

  onChangeSlider(v) {
    const { trago } = this.props
    const precio = trago.precio
    let total = precio
    if (v >= 50) {
      total = precio - 1980 + v * 33
    } else {
      total = precio - 500
    }

    this.setState({
      sliderValue: v,
      total
    })
  }

  pedirTragoPersonalizado = async (bebida) => {

    await this.setState({
      pedido: {
        _idTrago: this.state.pedido._idTrago,
        ml: 200 * this.state.sliderValue / 100, //Falta multiplicar por porcentaje para calcular ml
        bebida: bebida,
        estado: 'pendiente',
        total: this.state.total
      }
    })

    const { goHome } = this.props
    let data = {}
    const key = firebase.database().ref().child('pedido').push().key
    data[key] = this.state.pedido
    firebase.database().ref().child('pedido').update(data)
      .then(() => {
        goHome()
        Alert.alert('Pedido Realizado!')
      })
      .catch(err => {
        Alert.alert(err.message)
      })

  }

  render() {
    const { goHome, trago } = this.props

    return (
      <Card
        title={`${trago.marca} | ${trago.grado}º\n¿Qué tan cabezón?`}
      >
        <View style={{ width: '100%', height: 250 }}>
          <Image source={require('../../../assets/images/cabeza.png')} resizeMode='contain' style={{ alignSelf: 'center', width: (this.state.sliderValue * 2), height: 250 }} />
        </View>
        <Text style={{ textAlign: 'center', marginTop: 15, marginBottom: 10, fontSize: 30, fontWeight: 'bold' }} >
          {`TOTAL: $ ${this.state.total}`}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '100' }} >
          {`${this.state.sliderValue}% de Alcohol`}
        </Text>
        <Slider
          style={{ marginTop: 15, marginBottom: 10 }}
          maximumValue={90}
          minimumValue={10}
          onValueChange={(v) => this.onChangeSlider(v)}
          value={this.state.sliderValue}
          step={5}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignContent: 'space-between', marginTop: 40 }}>
          <View style={{ flex: 1 }}>
            <AppButton
              bgColor='rgba(28, 25, 21, 0.7)'
              title=''
              action={goHome}
              iconName='arrow-left'
              iconSize={20}
              iconColor='#fff'
              right={true}
            />
          </View>
          <View style={{ flex: 6, marginLeft: 5, }}>
            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)', marginBottom: 5, marginTop: -25 }}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.8)', textAlign: 'center', marginTop: 0, height: -25 }}>
                pídelo con
            </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ flex: 3, margin: 5 }}>
                <AppButton
                  bgColor='rgba(39, 168, 78, 0.8)'
                  title='Sprite'
                  action={() => this.pedirTragoPersonalizado('Sprite')}
                  width={'100%'}
                />
              </View>
              <View style={{ flex: 3 }}>
                <AppButton
                  bgColor='rgba(244, 0, 9, 0.8)'
                  title='Coca-Cola'
                  action={() => this.pedirTragoPersonalizado('Coca-Cola')}
                  width={'100%'}
                />
              </View>
            </View>
          </View>
        </View>

      </Card>
    )
  }
}