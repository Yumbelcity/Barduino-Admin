import React, { Component } from 'react'
import t from 'tcomb-form-native'
const Form = t.form.Form
import sliderTemplate from './templates/Slider'

export const Trago = t.struct({
  nombreTrago: t.String,
  precio: t.Number,
  // capacity: t.Number,
  // description: t.String
})

export const Options = {
  fields: {
    nombreTrago: {
      label: 'Nombre Trago (*)',
      placeholder: 'Nombre Trago'
    },
    precio: {
      label: 'Precio (*)',
      placeholder: 'Precio'
    },
    // capacity: {
    //   label: 'Capacidad',
    //   help: 'Capacidad en personas',
    //   config: {
    //     step: 1,
    //     min: 1,
    //     max: 100
    //   },
    //   template: sliderTemplate
    // },
    // description: {
    //   label: 'Descripción (*)',
    //   placeholder: 'Descripción',
    //   multiline: true,
    //   stylesheet: {
    //     ...Form.stylesheet,
    //     textbox: {
    //       ...Form.stylesheet.textbox,
    //       normal: {
    //         ...Form.stylesheet.normal,
    //         height: 150
    //       },
    //       error: {
    //         ...Form.stylesheet.error,
    //         height: 150
    //       }
    //     }
    //   }
    // }
  }
}