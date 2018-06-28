import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Rating } from 'react-native-elements'
import * as firebase from 'firebase'

export default class RestaurantRating extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }

    const { restaurantId } = props
    this.commentRef = firebase.database().ref(`comments/${restaurantId}`)

  }

  componentDidMount() {
    this.commentRef.on('child_added', snapshot => {
      this.commentRef.on('value', snap => {
        let comments = []
        snap.forEach(row => {
          comments.push(parseInt(row.val().rating))
        })

        this.setState({
          rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
        })

        this.refs.rating.setCurrentRating(
          comments.reduce((previous, current) => previous + current, 0) / comments.length
        )

      })
    })
  }

  render() {
    const { rating } = this.state
    return(
      <View>
          <Rating
            ref='rating'
            imageSize={20}
            readonly
            startingValue={rating}
          />
        </View>
    )
  }
}