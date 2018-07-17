import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AppButton extends Component {
  render() {
    const { action, iconName, iconColor, iconSize, title, bgColor, width, right, marginBottom } = this.props
    return (
      <Button
        onPress={action}
        buttonStyle={{
          backgroundColor: bgColor,
          borderColor: 'transparent',
          height: 45,
          borderWidth: 0,
          borderRadius: 100,
          marginBottom: marginBottom,
          width: width,
        }}
        title={title}
        icon={
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        }
        text={title}
        iconRight={right}
      >
      </Button>
    )
  }
}