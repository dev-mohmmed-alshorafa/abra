import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import Swiper from '../components/swiper'
import Tabs from '../components/tabs'
import Products from '../components/products'
import Apiservices from '../services/ApiServices'
const products = [
  {
    id: 0,
    name: 'Woman Ring',
    describtion: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
 `,
    img: './products/1.png',
    price: 100,
  },
  {
    id: 1,
    name: 'Woman wallet',
    describtion: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
 `,
    img: './products/2.png',
    price: 100,
  },
  {
    id: 2,
    name: 'Woman bag',
    describtion: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
 `,
    img: './products/3.png',
    price: 100,
  },
  {
    id: 3,
    name: 'Woman Shoes',
    describtion: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
  `,
    img: './products/4.png',
    price: 100,
  },
]
function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    Apiservices.get('/product').then((res) => {
      console.log(111111, res.data.data)
      setProducts(res.data.data)
    })
  }, [])
  return (
    <div className="home">
      <Nav />
      <Swiper />
      <Tabs />
      <Products products={products} />
    </div>
  )
}

export default Home
