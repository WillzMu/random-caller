import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, Input } from 'react-native-elements'
import * as Contacts from 'expo-contacts'
import Button from './Button'
import { main } from '../common/appStyles'
import { BLACK } from '../common/appColors'

export default function Home ({ navigation }) {
  const [randomNum, setRandomNum] = useState('3')
  const [errorMessage, setErrorMessage] = useState('')
  const [showIntro, setShowIntro] = useState(true)

  const handleGetStartedClick = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      return setShowIntro(false)
    }
    if (status === 'denied') {
      contactPermissionsDeniedAlert()
    }
  }

  const contactPermissionsDeniedAlert = () => {
    const title = 'Contact permissions required'
    const subtitle = 'This app requires contact persmisions to work. Note, we do not store any of your contacts. 😇'
    const btn = [
      {
        text: 'Ask me again',
        onPress: async () => handleGetStartedClick()
      }
    ]
    return (

      Alert.alert(title, subtitle, btn)
    )
  }

  const IntroductionView = () => (
    <>
      <View>
        <Text style={styles.title} h4>Hi 👋</Text>
        <Text style={styles.subtitle}>I'm going to help you randomly select three people from your contacts to call and re-connect with. </Text>
      </View>
      <Button
        text="Get Started"
        animating={false}
        handleClick={() => handleGetStartedClick() }
      />
    </>
  )

  const handleInputFieldChange = (text) => {
    if (isNaN(text)) {
      setRandomNum('')
      return setErrorMessage('Please enter a number')
    }

    setRandomNum(text)
    setErrorMessage('')
  }

  const onSubmit = () => {
    navigation.navigate('Contacts', { randomNum: Number(randomNum) })
  }
  return (
    <View style={styles.main}>
      {
        showIntro
          ? <IntroductionView />
          : (
            <>
              <Input
                label="Choose random number of people to call"
                labelStyle={styles.labelStyle}
                value={randomNum}
                onChangeText={(text) => handleInputFieldChange(text)}
                errorMessage={errorMessage}
              />
              <Button
                text="Submit"
                animating={false}
                handleClick={() => onSubmit() }
              />
            </>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    ...main,
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  labelStyle: {
    color: BLACK,
    fontWeight: 'normal'
  }
})
