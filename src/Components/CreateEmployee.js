import React,{useState} from 'react'
import axios from 'axios'


export default function CreateEmployee(){
    const [name,setName]= useState("");
    const [age,setAge]= useState("");
    const [id,setId]= useState("");
    function CreateEmployee(){
         let body={
             id:Number(id),
             name:name,
             age:Number(age)
         }
         axios.post('http://localhost:3000/employee',body)
               .then(()=>{
                   setId("");
                   setAge("");
                   setName("");
               })
    }
    return(
        <div className="div-padding">
            <h2>Create</h2>
            <form className="form-style" onSubmit={()=>CreateEmployee()}>
                <label className="block-margin">Name: <input value={name} onChange={e=>setName(e.target.value)} /></label>
                <label className="block-margin">Age: <input value={age} onChange={e=>setAge(e.target.value)} /></label>
                <label className="block-margin">Id: <input value={id} onChange={e=>setId(e.target.value)} /></label>
                <button className="button-margin">Save</button>
            </form>
        </div>
    );
}