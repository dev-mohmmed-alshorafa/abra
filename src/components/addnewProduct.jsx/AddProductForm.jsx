import React, { useEffect, useState } from 'react'
import SelectRef from './SelectRef'
import SuccsessText from '../details/SuccsessText'
import useOutsideClick from '../../hook/UseOutsideClick'
import Apiservices from '../../services/ApiServices'
import InputColor from 'react-input-color'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import { Stack } from '@mui/system'
import Color from '../colors'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import ProductValid from '../../validation/Product'

function AddProductForm({ formKind, setIsLoading }) {
  const [color, setColor] = React.useState({})
  const { t } = useTranslation()

  const [category, setCategory] = useState({ name: t('category'), _id: 0 })
  const [getCategory, setGetCategory] = useState([])
  const [size, setSize] = useState({ name: t('size'), _id: 0 })
  const [colors, setColors] = useState([])
  const handelAddColor = () => {
    if (colors.some((e) => e.hex === color.hex || e.rgba === color.rgba)) {
      alert('This color has been added previously')
    } else {
      setColors([color, ...colors])
    }
  }
  const [isAdd, setIsAdd] = useState(false)
  useEffect(() => {
    Apiservices.get('/category').then((res) => {
      setGetCategory(res.data.data)
    })
  }, [])
  const handleClickOutside = () => {
    setIsAdd(false)
  }
  const [img, setImg] = useState('')
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
  })

  const addSuccsess = async (Event) => {
    if (!img) {
      return toast.error('please add image')
    }
    if (size._id === 0) {
      return toast.error('please add size')
    }
    if (category === 0) {
      return toast.error('please add category')
    }
    if (colors.length === 0) {
      return toast.error('please add color')
    }
    try {
      const vaild = await ProductValid.validate(newProduct)
      const newData = new FormData()
      newData.append('image', img)
      // newData.append('color', colors)
      newData.append('name', newProduct.name)
      newData.append('category', category._id)
      newData.append('Sizes', size.name)
      newData.append('Quantity', 11)
      newData.append('price', newProduct.price)
      newData.append('description', newProduct.description)
      newData.append('Industry', '11')

      Event.preventDefault()
      setIsLoading(true)
      Apiservices.post('/product', newData)
        .then(() => {
          setIsLoading(false)
          setIsAdd(true)
        })
        .catch((err) => setIsLoading(false))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const ref = useOutsideClick(handleClickOutside)
  return (
    <form onSubmit={addSuccsess} className="add-product-form">
      <input
        placeholder={t('filename')}
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        type="text"
      />
      <textarea
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        placeholder={t('description')}
        name=""
        id=""
        cols="30"
        rows="6"
      ></textarea>
      <SelectRef
        isChoose={category}
        setIsChoose={setCategory}
        data={getCategory}
      />
      <SelectRef
        isChoose={size}
        setIsChoose={setSize}
        data={[
          { _id: '1', name: 'L' },
          { _id: '2', name: 'XL' },
        ]}
      />
      <input
        type="number"
        placeholder={t('price')}
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <Box>
        <Stack
          gap="15px"
          justifyContent={'flex-start'}
          alignItems={'center'}
          direction={'row'}
        >
          <p
            onClick={handelAddColor}
            style={{
              background: 'rgb(51, 81, 166)',
              color: '#ffff',
              padding: '5px 5px 3px 5px',
              borderRadius: '50%',
            }}
          >
            <AddIcon />
          </p>
          <InputColor
            initialValue="#5e72e4"
            onChange={setColor}
            placement="top"
          />
        </Stack>
        <Stack direction={'row'} gap="10px" p={'15px 0 0 0'}>
          {colors.map((e, i) => (
            <Color
              setColors={setColors}
              colors={colors}
              key={i}
              color={e.rgba}
            />
          ))}
        </Stack>
      </Box>
      <p className="products-images">{t('productimg')} </p>
      <section className="add-images-btns">
        <label htmlFor="img1">
          <img src="./icons/addimage.png" alt="" />
        </label>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          name=""
          id="img1"
        />
        <input style={{ display: 'none' }} type="file" name="" id="img2" />
        <label htmlFor="img2">
          <img src="./icons/addimage.png" alt="" />
        </label>
      </section>

      <div className={isAdd ? 'active-succsess' : 'succsess'}>
        <button
          style={{ display: isAdd ? 'none' : 'block' }}
          ref={ref}
          onClick={addSuccsess}
          className="add-to-cart-product"
        >
          {t('addproduct')}
        </button>
        {isAdd && <SuccsessText />}
      </div>
    </form>
  )
}

export default AddProductForm
