import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native'

export default class PreLoader extends Component {
  render() {
    return (
      <View style={styles.preloader} >
        <ActivityIndicator color='black' size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})