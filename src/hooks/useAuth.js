import React, { useState, useContext, createContext } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import endPoints from '@services/api/'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth()

  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>
}

const useProviderAuth = () => {
  const [user, setUser] = useState(null)

  /* const signIn = async (email, password) => {
    console.log('signIn')
    const options = {
      headers: {
        accept: '',
        'Content-Type': 'application/json'
      }
    }
     const { data: access_token } = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    ) 
    console.log('token', access_token)
    console.log(access_token)
    if (access_token) {
      const token = access_token.access_token
      Cookie.set('access_token', token, { expires: 5 })

      axios.defaults.headers.Authorization = `Bearer ${token}`
      const { data: user } = await axios.get(endPoints.auth.profile)
      console.log(user)
      setUser(user)

      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  } */
  const signIn = async (email, password) => {
    console.log('email', email)
    console.log('password', password)
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    }

    // iniciar sesión
    const { data } = await axios.post(endPoints.auth.login, { email, password }, options)

    const token = data.access_token
    if (token) {
      Cookie.set('token', token, { expires: 5 })

      // configura axios con valores default se carga el token con Bearer
      axios.defaults.headers.Authorization = `Bearer ${token}`

      // solicito el usuario
      const { data: user } = await axios.get(endPoints.auth.profile)
      // se agrega user al context
      setUser(user)
    }
  }
  const logout = () => {
    Cookie.remove('access_token')
    setUser(null)
    delete axios.defaults.headers.Authorization
    window.location.href = '/login'
  }
  return {
    user,
    signIn,
    logout
  }
}

export default useProviderAuth
