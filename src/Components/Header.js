import React from 'react'
import {Link} from '@reach/router';


export default function Header(){
    return(
        <div className="header">
            <Link to="/get"    className="header-links">Employees List</Link>
            <Link to="/create" className="header-links">Create Employee</Link>
        </div>
    );
}