import React, { useState } from 'react'
import Apiservices from '../../services/ApiServices'
import { actions } from '../../Redux'
import JwtService from '../../services/TokenServices'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import SignInValid from '../../validation/SignIn'

function LoginForm({ setIsLoading }) {
  const i = {
    phoneNumber: '',
    password: '',
  }
  const dispatch = useDispatch()

  const [login, setLogin] = useState(i)
  const handelLogin = async(e) => {
    e.preventDefault()
try{
  const validated = await SignInValid.validate(login)
  setIsLoading(true)

  
  Apiservices.post('/auth/login', login).then((res) => {
      
    if (res.data.token) {
      JwtService.setToken(res.data.token)
      dispatch(actions.protect({ ...res.data.data, _id: res.data.data.id }))
      dispatch(actions.setShowForm(0))
      setLogin(i)
      setIsLoading(false)
    } else {
      setIsLoading(false)

      console.log(111)
    }
  }).catch(()=>{
    setIsLoading(false)

    toast.error(t('datainfo'))
  })
}catch (err) {
  toast.error(err.message)
}
  
  
  }
  const { t } = useTranslation()
  return (
    <>
      <form action="">
        <input
          placeholder={t('pnum')}
          value={login.phoneNumber}
          onChange={(e) => setLogin({ ...login, phoneNumber: e.target.value })}
          type="text"
        />
        <input
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          placeholder={t('password')}
          type="password"
        />
        <span>{'forgetpassword'}</span>
        <button onClick={handelLogin}>{t('signin')}</button>
      </form>
    </>
  )
}

export default LoginForm
