'use client'

import {React,useCallback,useEffect,useRef,useState} from "react";
import styles from "./Create.module.css";
import Link from "next/link";
import Image from "next/image";
import hamburger from '../../public/images/burger-bar.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {

  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [responseLimit,setResponseLimit]=useState(0);
  const [formEndDate,setFormEndDate]=useState("");

  const [fields,setfields]=useState(['name','description','responseLimit','formEndDate']);

  const router=useRouter();
  const dragItemRef=useRef(null);
  const dragOverItemRef=useRef(null);

  const renderInput=(val)=>{
    switch (val) {
      case 'name':
        return (
          <div>
            <label>From Name<Image id={styles.img} draggable='false' src={hamburger} alt="ham"/></label>
            <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}
            autoComplete="off" placeholder='Write your Form Title'></input>
          </div>
        )
      case 'description':
        return (
          <div>
            <label>Description<Image id={styles.img} draggable='false' src={hamburger} alt="ham"/></label>
            <input type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}}
            autoComplete="off" placeholder='Write your Form Description'></input>
          </div>
        )
      case 'responseLimit':
        return (
          <div>
            <label>Response Limit<Image id={styles.img} draggable='false' src={hamburger} alt="ham"/></label>
            <input type='number' value={responseLimit} onChange={(e)=>{setResponseLimit(e.target.value)}}
            autoComplete="off" placeholder='Write your Form Response Limit'></input>
          </div>
        )
      case 'formEndDate':
        return (
          <div>
            <label>From End Date<Image id={styles.img} draggable='false' src={hamburger} alt="ham"/></label>
            <input type='date' value={formEndDate} onChange={(e)=>{setFormEndDate(e.target.value)}}
            autoComplete="off" placeholder='Write your Form End Date'></input>
          </div>
        )
      default:
        break;
    }
  }

  const handleDrag=()=>{

    let dupInput=[...fields];

    const item=dupInput.splice(dragItemRef.current,1)[0];

    dupInput.splice(dragOverItemRef.current,0,item);
  
    dragItemRef.current=null;
    dragOverItemRef.current=null;

    setfields(dupInput)
  }


  const FormCreateFunction =() => {
    
    const submitFunction=async ()=>{
      setFormEndDate(formEndDate.substring(0,10));
      await axios.post('http://localhost:3001/create',
      {name,description,responseLimit,formEndDate,fields});
    }

    submitFunction();
    
    toast.success("Form created Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    
    setTimeout(()=>{
      router.push('/');
    },1000);
  
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formDiv}>
        <div className={styles.headerDiv}>
          <Link href='/'>
            <button>Back</button>
          </Link>
          <h1>Create Your Form</h1>
          <div></div>
        </div>
        <div className={styles.formInfoDiv}>
          {
            fields.map((data,index)=>{
              return(
                <div key={index}
                  draggable
                  onDrag={()=>{dragItemRef.current=index}}
                  onDragEnter={()=>{dragOverItemRef.current=index}}
                  onDragEnd={()=>{handleDrag()}}
                  onDragOver={(e)=>e.preventDefault()}
                >
                  {renderInput(data)}
                </div>
              )
            })
          }
        </div>
        <div className={styles.optionsDiv}>
          <button onClick={FormCreateFunction}>Submit</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default page;
