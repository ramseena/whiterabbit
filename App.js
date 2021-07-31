import AppContainer from './app/router/nav'

import * as React from 'react'
import {useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native'

export default function App () {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppContainer />
    </SafeAreaView>
  )
}
