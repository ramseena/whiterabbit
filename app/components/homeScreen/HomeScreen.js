import {useLinkProps} from '@react-navigation/native'
import React, {useEffect, useState, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import styles from './Styles'
import database, {firebase} from '@react-native-firebase/database'

const HomeScreen = props => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const getEmployeeData = async () => {
    try {
      const response = await fetch(
        'http://www.mocky.io/v2/5d565297300000680030a986 ',
      )
      const json = await response.json()

      setData(json)
      setFilteredDataSource(json)
      insertdata()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const insertdata = () => {
    const ref = database().ref('employee/list')
    ref
      .set(filteredDataSource)
      .then(() => {
        console.log('hgfhdg')

        checkData()
        setLoading(false)
      })
      .catch(error => {
        console.log(error + 'error')
      })
  }

  const checkData = () => {
    database()
      .ref('employee/list')
      .on('value', snapshot => {
        if (snapshot.val()) {
          const emp = snapshot.toJSON()

          setFilteredDataSource(emp)
          setData(emp)
          setLoading(false)
        } else {
          getEmployeeData()
        }
      })
  }
  useEffect(() => {
    checkData()
  }, [])

  const snapshotToArray = snapshot => {
    var returnArr = []

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val()
      item.key = childSnapshot.key

      returnArr.push(item)
    })

    return returnArr
  }
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('DetailScreen', {item: item})}
      style={{
        borderRadius: 5,
        margin: 5,
        padding: 10,
        borderWidth: 1,
      }}>
      <Text>{item.name}</Text>
      <Text>{item.username}</Text>

      <Image
        style={{width: 25, height: 25, margin: 3}}
        source={{uri: item.profile_image}}
      />
      {item.company ? <Text>{item.company.name}</Text> : null}
    </TouchableOpacity>
  )
  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredDataSource(newData)
      setSearch(text)
    } else {
      setFilteredDataSource(data)
      setSearch(text)
    }
  }
  return (
    <View style={{flex: 1, padding: 2}}>
      {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator} color='black' />
      ) : (
        <View>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid='transparent'
            placeholder='Search Here'
          />

          <FlatList
            extraData={filteredDataSource}
            data={filteredDataSource}
            keyExtractor={({id}, index) => id}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  )
}
export default HomeScreen
