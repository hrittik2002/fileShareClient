import React from 'react'
import styles from './HomePage.module.css'
import UploadContainer from '../../Components/UploadContainer/UploadContainer'

const HomePage = () => {
  return (
    <div className={styles.parentContainer}>
        <UploadContainer/>
    </div>
  )
}

export default HomePage