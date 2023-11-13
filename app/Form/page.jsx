'use client'

import React, {useEffect, useState } from 'react'
import { useLayoutEffect } from 'react';
import styles from './Form.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import { useSearchParams,useRouter } from 'next/navigation';

const page = () => {

  const router=useRouter();

  const [edit,setEdit]=useState(false);
  const [deleted,setDeleted]=useState(false);
  const [form,setForm]=useState(null);

  const [fields,setFields]=useState([]);

  const [name,setName]=useState();
  const [description,setDescription]=useState();
  const [responseLimit,setResponseLimit]=useState();
  const [formEndDate,setDate]=useState();

  const searchParams=useSearchParams();
  const id=searchParams.get('id');

  useLayoutEffect(()=>{
    const fetchForm=async ()=>{
      try{
        const response=await axios.get(`http://localhost:3001/${id}`);
        setForm(response.data.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchForm();
  },[]);

  useEffect(()=>{
    if(form){
      setName(form.name);
      setDescription(form.description);
      setResponseLimit(form.responseLimit);
      setDate(form.formEndDate.substring(0,10));
      setFields(form.fields);
    }
  },[form]);


  const showDeleteMessage = () => {
    const deleteFunction=async ()=>{
      const response=await axios.put(`http://localhost:3001/delete/${id}`);
    }
    deleteFunction();
    toast.success("Form deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(()=>{
      router.push('/');
    },1000);
  };
  const showUpdateMessage=()=>{
    const updateFunction=async ()=>{
      const response=await axios.put(`http://localhost:3001/update/${id}`,{
        name,description:description,responseLimit:responseLimit,formEndDate:formEndDate
      });
    }
    
    updateFunction();
    
    toast.success('Form Updated Successfully',{
      position:toast.POSITION.TOP_RIGHT,
    });
    setEdit(false);
  }
  return form && (
    <div className={styles.formPage}>
      <div className={styles.formDiv}>
        <div className={styles.headerDiv}>
          <Link href='/'>
            <button>Back</button>
          </Link>
          <h1>Form</h1>
          <div></div>
        </div>
        <div className={styles.formInfoDiv}>
            {
              fields.map((field,index)=>{
                if(field==='name'){
                  return(
                    <div key={index}>
                      <label>Form Name</label>
                      {
                      edit?
                      <input type="text" autoComplete="off" placeholder="Give your form a name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                      :
                      <h2>{name}</h2>
                      }
                    </div>
                  )
                }else if(field==='description'){
                  return (
                    <div key={index}>
                      <label>Descritpion</label>
                      {
                        edit?
                        <input type="text" autoComplete="off" placeholder="Describe your form here" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                        :
                        <h2>{description}</h2>
                      }
                    </div>
                  )
                }else if(field==='responseLimit'){
                  return (
                    <div key={index}>
                      <label>Response Limit</label>
                      {
                        edit?
                        <input type="number" autoComplete="off" value={responseLimit} onChange={(e)=>{setResponseLimit(e.target.value)}}></input>
                        :
                        <h2>{responseLimit}</h2>
                      }
                    </div>
                  )
                }else{
                  return (
                  <div key={index}>
                    <label>Form End Date</label>
                    {
                      edit?
                      <input type="date" value={formEndDate} onChange={(e)=>{setDate(e.target.value)}}></input>
                      :
                      <h2>{formEndDate}</h2>
                    }
                  </div>
                  )
                }
              })
            }
        </div>
        <div className={styles.optionsDiv}>
            {
              edit?
              <button onClick={showUpdateMessage}>Update</button>
              :
              <button onClick={()=>{setEdit(true)}}>Edit</button>
            }
            <button onClick={showDeleteMessage}>Delete</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default page
