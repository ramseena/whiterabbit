/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react'

import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native'

const RenderInfoItem = props => (
  <View style={styles.detailsView}>
    <Text style={styles.listText}>{props.title}: </Text>
    <Text style={styles.listText}>{props.value}</Text>
  </View>
)

const DetailScreen = props => {
  const [dataSource, setDataSource] = useState({})

  useEffect(() => {
    retreiveData()
  }, [])
  const retreiveData = () => setDataSource(props.route.params.item)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.imageView}
          source={{uri: dataSource.profile_image}}
        />
        <RenderInfoItem title={'id'} value={dataSource?.id} />
        <RenderInfoItem title={'name'} value={dataSource?.name} />
        <RenderInfoItem title={'Address'} value={dataSource?.address?.city} />
        <RenderInfoItem title={'Email'} value={dataSource?.email} />
        <RenderInfoItem title={'Website'} value={dataSource?.website} />
        <RenderInfoItem
          title={'Company Name'}
          value={dataSource?.company?.name}
        />
      </View>
    </SafeAreaView>
  )
}
export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailsView: {
    flexDirection: 'row',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  listText: {
    fontSize: 14,
  },
  imageView: {
    width: 200,
    height: 300,
    margin: 3,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
})
