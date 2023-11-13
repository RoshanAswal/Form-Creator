'use client'

import React, { useEffect,useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

import Image from "next/image";

import leftArrow from '../../public/images/left-chevron.png'
import rightArrow from '../../public/images/right-chevron.png';

import axios from "axios";

const homePage = async () => {

  const [forms,setForms]=useState();

  useEffect(()=>{
    const getFormsFunction=async ()=>{
      const response=await axios.get("http://localhost:3001/");
      setForms(response.data);
      console.log(response);
    }
    getFormsFunction();
  },[]);

  return forms && (
    <div className={styles.homePage}>
      <div className={styles.mainDiv}>
        <div className={styles.headerDiv}>
          <h1>Forms</h1>
            <Link href="/Create">
            <button className={styles.newBtn}>Create Form</button>
            </Link>
        </div>
        <div className={styles.forms}>
          {
            forms.map((form,key)=>{
              return (
                <Link key={key} href={{
                  pathname:'/Form',
                  query:{
                    id:form._id
                  }
                }}>
                <div className={styles.form}>{form.name}</div>
                </Link>                
              )           
            })
          }
        </div>
        <div className={styles.direction}>
          <Image className={styles.img1} src={leftArrow} alt="left"/>
          <Image className={styles.img2} src={rightArrow} alt="right"/>
        </div>
      </div>
    </div>
  );
};

export default homePage;
