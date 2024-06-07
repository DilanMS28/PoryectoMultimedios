import React from 'react'
import {Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function menúItems({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
    </TouchableOpacity>
  )
}


