import FormProducts from '@components/FormProducts'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import endPoints from '@services/api'

export default function Edit() {
  const [notFound, setNotFound] = useState(false)
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const productId = router.query.id
  console.log(productId)
  useEffect(() => {
    //El id se obtendrá desde la URL
    const { id } = router.query
    //Si la ruta aún no está lista, entonces el id tampoco
    if (!router.isReady) return
    //Función para obtener la info del producto a partir del id
    const getCategories = async () => {
      const { data } = await axios.get(endPoints.categories.getCategories())
      setCategories(data)
    }
    const getProduct = async () => {
      const response = await axios.get(endPoints.products.getProduct(id))
      return response
    }
    //Si la promesa se resuelve, asignamos la data a product
    getCategories()
    getProduct()
      .then(response => setProduct(response.data))
      //Si el id no existe, mandamos a notFound
      .catch(err => router.push('/notFound'))
  }, [router?.isReady])

  return notFound ? (
    <div> Product Not Found </div>
  ) : (
    <FormProducts categories={categories} product={product} />
  )
}
