import React from 'react'
import { Button, Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function menúItems({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
    </TouchableOpacity>
  )
}


