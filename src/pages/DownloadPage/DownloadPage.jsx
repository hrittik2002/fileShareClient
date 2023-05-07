import React, { useEffect, useState } from 'react'
import styles from './DownloadPage.module.css'
import downloadImage from '../../assets/Images/download.svg'
import { useParams } from 'react-router-dom'
import { getDownloadDeltailsApiCall, getfileByUuidApiCall } from '../../apiCalls/apiCalls'

const DownloadPage = () => {
    const { uuid } = useParams();
    const [ fileName , setFileName ] = useState();
    const [ fileSize , setFileSize ] = useState();
    const [ downloadLink , setDownloadLink ] = useState();
    const getDownloadDetails = async() => {
        const res = await getDownloadDeltailsApiCall(uuid);
        console.log(res);
        setFileName(res.data.fileName);
        setFileSize(res.data.fileSize);
        setDownloadLink(`http://localhost:5000/api/download/${uuid}`)
    }
    useEffect(()=>{
        getDownloadDetails()
    },[])
    
  return (
    <div className={styles.parentContainer}>

    <section className={styles.download}>
        <img className={styles.downloadIcon} src={downloadImage} alt="inshare-download"/>
        <h2>Your file is ready to download</h2>
        <p>Link expires in 24 hours</p>
        <div className={styles.downloadMeta}>
            <h4>{fileName}</h4>
            <small>{fileSize} KB</small>
        </div>
        <div className={styles.sendBtnContainer}>
            <a href={downloadLink} >Download file</a>
        </div>
    </section>
</div>
  )
}

export default DownloadPage