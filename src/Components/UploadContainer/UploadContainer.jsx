import React, { useRef, useState } from "react";
import styles from "./UploadContainer.module.css";
import fileImage from "./../../images/file.svg";
import { sendEmailApiCall, uploadFileApiCall } from "../../apiCalls/apiCalls";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from '@chakra-ui/react'

const UploadContainer = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [toEmail , setToEmail] = useState("");
  const [fromEmail , setFromEmail] = useState("");
  const [uuid , setUuid] = useState("");
  const inputRef = useRef(null);
  const toast = useToast();
  const uplaoadFileHandler = async(fileUploaded) => {
    if(fileUploaded){
      console.log(fileUploaded);
        const res = await uploadFileApiCall(fileUploaded);
        console.log(res);
        setDownloadUrl(res.data.file);
        setUuid(res.data.uuid);
        if(res && res.status === 200){
          toast({
            title: 'File Uploaded Successfully',
            status: 'success',
            position: 'top',
            duration: 6000,
            isClosable: true,
          })
        }
        else{
          toast({
            title: 'Something went wrong',
            status: 'error',
            position: 'top',
            duration: 6000,
            isClosable: true,
          })
        }
    }
  }
  const handleDrag = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
    console.log(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileUploaded = e.dataTransfer.files[0];
      const file = await uplaoadFileHandler(fileUploaded);
      // console.log(e.dataTransfer.files[0]);
      // const res = await uploadFileApiCall(e.dataTransfer.files[0]);
      // console.log(res);
      // setDownloadUrl(res.data.file);
      // setUuid(res.data.uuid);
    }
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const copyTextToClipboard = async(text) =>{
    if('clipboard' in navigator){
      return await navigator.clipboard.writeText(text);
    }
    else{
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = async() =>{
    try{
      await copyTextToClipboard(downloadUrl)
    }
    catch(err){
      console.log(err);
    }
  }
  const sendEmailHandler = async(e) => {
    e.preventDefault();
    console.log(uuid , fromEmail , toEmail)
    const res = await sendEmailApiCall(uuid , fromEmail , toEmail);
    console.log(res);
    if(res && res.status === 200){
      toast({
        title: 'Email Sent',
        description: "Check Your Email",
        status: 'success',
        position: 'top',
        duration: 6000,
        isClosable: true,
      })
    }
    else{
      toast({
        title: 'Something went wrong',
        status: 'error',
        position: 'top',
        duration: 6000,
        isClosable: true,
      })
    }
  }
  
  const handleUploadFileByCilck = async(e) =>{
    const fileUploaded = e.target.files[0];
    const file = await uplaoadFileHandler(fileUploaded);
  }

  return (
    <div className={styles.uploadContainer}>
      <div
        onDragOver={(e) => {
          handleDrag(e);
        }}
        onDragLeave={() => {
          setIsDrag(false);
        }}
        onDrop={(e) => {
          handleDrop(e);
        }}
        className={
          isDrag ? `${styles.dropZone} ${styles.dragged}` : `${styles.dropZone}`
        }
      >
        <div className={styles.iconContainer}>
          <img
            src={fileImage}
            alt="file icon"
            className={styles.center}
            draggable="false"
          />
          <img
            src={fileImage}
            alt="file icon"
            className={styles.left}
            draggable="false"
          />
          <img
            src={fileImage}
            alt="file icon"
            className={styles.right}
            draggable="false"
          />
        </div>
        <input ref={inputRef} type="file" className={styles.fileInput} onChange={(e)=>handleUploadFileByCilck(e)}/>
        <div className={styles.title}>
          Drop your Files here or ,{" "}
          <span onClick={handleClick} className={styles.browseBtn}>
            browse
          </span>
        </div>
      </div>
      {downloadUrl !== "" && (
        <div className={styles.sharingContainer}>
          
          <p className={styles.expire}>Link expires in 24hrs</p>

          <div className={styles.inputContainer}>
            <input type="text" id="fileURL" readOnly value={downloadUrl} />
            <ContentCopyIcon onClick={handleCopyClick} fontSize="30px" className={styles.icon} />
          </div>

          <p className={styles.expire}>Or Send Via Email</p>
          <div className={styles.emailContainer}> 
            <form>
              <div className={styles.field}>
                <label htmlFor="sender">Your Email</label>
                <input type="email" id="sender" required onChange={(e)=>{setFromEmail(e.target.value)}} name="formEmail"></input>
              </div>
              <div className={styles.field}>
                <label htmlFor="sender">Receiver's Email</label>
                <input type="email" id="sender" required onChange={(e)=>{setToEmail(e.target.value)}} name="ToEmail"></input>
              </div>
              <button className={styles.submitBtn} onClick={(e)=>{sendEmailHandler(e)}}>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadContainer;
