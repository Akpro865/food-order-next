import Image from 'next/image'
import styles from './featured.module.css'
import { useState } from 'react'

const foods = [
  '/food1.png',
  '/food2.png',
  '/food3.png',
  '/food4.png',
]

function Featured() {
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const prev = () => {
   const isFirstIndex = currentIndex === 0
   const newIndex =   isFirstIndex ? foods.length -1 : currentIndex - 1;
   setCurrentIndex(newIndex)
  }
  const next = () => {
   const isLastIndex = currentIndex === foods.length - 1
   const newIndex = isLastIndex ? 0 : currentIndex + 1
   setCurrentIndex(newIndex)
  }  

  return (
  	<section className={`bg-app-color relative h-3/5 w-full sm:s-screen`}>
    <div >
      <img src="/arrowl.png" className={`${styles.carouselButton} ${styles.prev}`}  onClick={prev}/>
      <img src="/arrowr.png" className={`${styles.carouselButton} ${styles.next}`}  onClick={next}/>
      <div className='flex justify-center'>
        <img src={foods[currentIndex]} className='p-4'/>
      </div>
    </div>    
  </section>
  )
}

export default Featured