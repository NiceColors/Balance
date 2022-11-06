import { View, Text } from 'react-native'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilAuth } from '../recoil/recoilAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useLogout() {
  const setUser = useSetRecoilState(recoilAuth)

  function logOut() {
    setUser(null)
    AsyncStorage.clear()
  }

  return{logOut}
}