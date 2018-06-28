import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { Card } from 'react-native-elements'
import AppButton from '../AppButton'

export default class Trago extends Component {

  render() {
    const { personalizarTrago, pedirNegra, pedirBlanca, trago } = this.props

    return (
      <Card
        title={trago.nombreTrago}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', }}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: trago.imagePath }} resizeMode='cover' style={{ width: '100%', height: 130, marginLeft: 0 }} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'left', marginTop: 15, marginBottom: 5, fontSize: 25, fontWeight: 'bold' }} >
              {`${trago.marca}`}
            </Text>
            <Text style={{ textAlign: 'left', marginTop: 0, marginBottom: 50, fontSize: 20 }} >
              {`${trago.grado}º`}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', alignContent: 'space-between', marginTop: 20 }}>
          <View style={{ flex: 5 }}>
            <AppButton
              bgColor='rgba(200, 38, 74, 1)'
              title='Personalizar Trago'
              action={personalizarTrago}
              iconName='sliders'
              iconSize={20}
              iconColor='#fff'
              width={'100%'}
            />
          </View>
          <View style={{ flex: 2, marginLeft: 5 }}>
            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)', marginBottom: 5, marginTop: -25 }}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.8)', textAlign: 'center', marginTop: -5, height: 20 }}>
                pídelo con
            </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ flex: 1, margin: 5 }}>
                <AppButton
                  bgColor='rgba(39, 168, 78, 0.8)'
                  title='S'
                  action={pedirBlanca}
                  width={'100%'}
                />
              </View>
              <View style={{ flex: 1, }}>
                <AppButton
                  bgColor='rgba(244, 0, 9, 0.8)'
                  title='C'
                  action={pedirNegra}
                  width={'100%'}
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 15, marginBottom: 10, fontSize: 30, fontWeight: 'bold' }} >
          {`TOTAL: $ ${trago.precio}`}
        </Text>

      </Card>
    )
  }
}