import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function ColorsProduct() {
  const details={
    colors:['black','#E3142C','#E38414'],
    size:['XL','L','XXL']
  }
  const [isChoose,setIsChoose]=useState(details.colors[0])
  const { t } = useTranslation()

  return (
    <div className='colors'>
      <p className='select-text'>{t("selectcolor")}</p>
      <div>
        <div className='choose-color'>
        {
        details.colors.map((e,i)=> <button onClick={()=>{
          setIsChoose(e)
        }} key={i} className='color' style={{background:e}}>
          
          <img style={{display:isChoose===e?'block':'none'}}  src="./icons/check.png" alt="" />
        </button> )
      }
        </div>
    
      </div>
      <p className='size-text'>{t("selectsize")}</p>
      <select name="" id="">
        {
         details.size.map((e,i)=> <option key={i} value={e}>{e}</option> ) 
        }
      </select>
    </div>
  )
}

export default ColorsProduct
