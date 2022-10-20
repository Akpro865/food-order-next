import { useState } from 'react'

const foods = [
	'/food1.png',
	'/food2.png',
	'/food3.png',
	'/food4.png',
]

function Slide() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const prev = () => {
	 const isFirstIndex = currentIndex === 0
	 const newIndex =  	isFirstIndex ? foods.length -1 : currentIndex - 1;
	 setCurrentIndex(newIndex)
	}
	const next = () => {
	 const isLastIndex = currentIndex === foods.length - 1
	 const newIndex = isLastIndex ? 0 : currentIndex + 1
	 setCurrentIndex(newIndex)
	}
	
  return (
  	<div>
      <button onClick={prev}>left</button>
      <img src={foods[currentIndex]} style={{height:'250px'}} />
      <button onClick={next}>right</button>
    </div>
  )
}

export default Slide