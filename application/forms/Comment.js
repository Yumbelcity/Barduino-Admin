import React, { Component } from 'react'
import t from 'tcomb-form-native'
const Form = t.form.Form
import sliderTemplate from './templates/Slider'

export const Comment = t.struct({
  rating: t.Number,
  comment: t.maybe(t.String)
})

export const Options = {
  fields: {
    rating: {
      label: 'Puntuación',
      help: '¿Qué puntuación le das del 1 al 5?',
      template: sliderTemplate,
      config: {
        step: 1,
        min: 1,
        max: 5
      }
    },
    comment: {
      label: 'Comentario',
      placeholder: 'Comentario',
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.normal,
            height: 50
          },
          error: {
            ...Form.stylesheet.error,
            height: 50
          }
        }
      }
    }
  }
}