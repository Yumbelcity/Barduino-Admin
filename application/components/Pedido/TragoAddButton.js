import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import AppButton from '../AppButton'

export default class TragoAddButton extends Component {

  render() {
    const { addTrago } = this.props
    return (
      <View style={styles.buttonContainer}>
        <AppButton
          bgColor='rgba(255, 38, 74, 0.9)'
          title='Añadir un Trago'
          action={addTrago}
          iconName='plus'
          iconSize={15}
          iconColor='#fff'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -2,
    padding: 20,
    width: '100%',
  }
})