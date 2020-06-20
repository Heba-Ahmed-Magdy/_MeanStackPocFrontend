import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Modal,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Employees(){
    let [employees,setEmployees] = useState([]);
    let tableHeaders=["Name","Age","Id","Actions"];
    let [tempName,setTempName] = useState('');
    let [tempAge,setTempAge] = useState('');
    let [tempId,setTempId] = useState('');
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (obj) =>
    {
        setTempName(obj.name);
        setTempAge(obj.age);
        setTempId(obj.id);
       setShow(true);
    }

    useEffect(()=>{
        axios
          .get('http://localhost:3000/employee')
          .then(response=>{
              console.log(response)
              setEmployees(response.data)
          })
    },employees);
    function deleteElement(id){
        axios.delete('http://localhost:3000/employee/'+id)
          .then((response)=>{
              console.log(response)
              setEmployees(response.data);
          })
    }
   function saveUpdateEmployee(_id,_name,_age){
       let body={
           id:_id,
           name:_name,
           age:_age
       }
       console.log(_id,body)
       axios.put('http://localhost:3000/employee/'+_id,body)
       .then((response)=>{
        console.log(response.data)
           setEmployees(response.data);
           handleClose()
       });
         
   }
    
    return(
        <div>
            <h2>List of Employees</h2>
            <div className="table-container">
            <table className="table-data">
                <thead>
                    {
                        tableHeaders.map(header=>{
                            return   <th>{header}</th>
                        })
                    }
                </thead>
                <tbody>
                    {
                        employees.map(obj=>{
                            return (
                                <tr key={obj.id}>
                                    <td>{obj.name}</td>
                                    <td>{obj.age}</td>
                                    <td>{obj.id}</td>
                                    <td>
                                        <span onClick={()=>deleteElement(obj.id)}>
                                            <FontAwesomeIcon icon={faTrash} size="lg" /> 
                                         </span>
                                        <span>
                                             {/* <Link to="/update" className="header-links" >
                                                <FontAwesomeIcon icon={faEdit} size="lg"/>
                                             </Link> */}
                                             <Button className="icon-color" variant="primary" 
                                                       onClick={()=>{handleShow(obj)}}>
                                                     <FontAwesomeIcon icon={faEdit} size="lg"/>
                                             </Button>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
           
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                <form>
                    <label className="block-margin">Name: <input value={tempName} onChange={(e)=>{console.log(e.target);setTempName(e.target.value);}}  /></label>
                    <label className="block-margin">Age: <input value={tempAge}   onChange={(e)=>{console.log();setTempAge(e.target.value);}} /></label>
                    <label className="block-margin">id: <input value={tempId}     onChange={(e)=>{console.log();setTempId(e.target.value);}} /></label>
                </form>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{saveUpdateEmployee(tempId,tempName,tempAge)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

