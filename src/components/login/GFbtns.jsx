import React, { useState } from 'react'
import Apiservices from '../../services/ApiServices'
import { useTranslation } from 'react-i18next'

function GFbtns() {
  const [a, setA] = useState('')
  const loginWithGoogle = () => {
    Apiservices.get('/auth').then((res) => setA(res.data))
  }
  const { t } = useTranslation()
  return (
    <div className="g-f-btns">
      <button onClick={loginWithGoogle}>
        <img src="./icons/google.png" alt="" />
        <p>{t("continegoogle")} </p>
      </button>

      <button>
        <img src="./icons/facebook.png" alt="" />
        <p>{t("continefacebook")} </p>
      </button>
    </div>
  )
}

export default GFbtns
