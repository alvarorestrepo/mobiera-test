import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card/Card'
import { getProducts } from '../../redux/actions'
import styles from './Home.module.css'


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className={styles.container_contend}>
      <div className={styles.cardContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    <div className={styles.container}>
        {products.length > 0 &&
          products.filter(item => {
            return item.title.toLowerCase().includes(search.toLowerCase())
          }).sort((a, b) => {
            if(a.title < b.title) return -1
            return 0
          })
          .map((product) => (
          <Card
            key={product.id}
            category={product.category}
            description={product.description}
            id={product.id}
            image={product.image}
            price={product.price}
            count={product.rating.count}
            rate={product.rating.rate}
            title={product.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Home