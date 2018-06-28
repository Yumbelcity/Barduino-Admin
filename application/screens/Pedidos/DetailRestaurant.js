import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import BackgroundImage from '../../components/BackgroundImage'
import PersonalizarTrago from '../../components/Pedido/PersonalizarTrago'

export default class DetailRestaurant extends Component {

  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    this.state = {
      trago: params.trago
    }
  }

  goHome = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ListRestaurants'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {

    const { trago } = this.state
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
        <ScrollView>

          <PersonalizarTrago
            goHome={this.goHome}
            trago={trago}
          />

        </ScrollView>
      </BackgroundImage>
    )
  }
}