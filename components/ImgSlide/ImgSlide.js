import styles from './imgslide.module.css'

function ImgSlide() {
  return (
  	<div className='flex flex-col p-4'>
  		<h2 className='font-semibold flex justify-center py-3 text-xl sm:text-3xl'>Choose your taste</h2>
  		<div className='flex justify-center'>
	  	 <div className={`${styles.gallery} flex`}>
	  	  <img src='/slide1.jpg' className={`${styles.galleryImg}`}/>
	  	  <img src='/slide2.jpg' className={`${styles.galleryImg}`}/>
	  	  <img src='/slide3.jpg' className={`${styles.galleryImg}`}/>
	  	  <img src='/slide4.jpg' className={`${styles.galleryImg} hidden md:block`}/>
	  	  <img src='/slide5.jpg' className={`${styles.galleryImg} hidden md:block`}/>
	     </div>
	    </div>
    </div>
  )
}

export default ImgSlide