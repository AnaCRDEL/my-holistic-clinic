import React from 'react'
import { NavLink } from 'react-router-dom';

function PublicHome() {
    return (
      <div>
        <NavLink to='/login'>Login Profissional</NavLink>
      </div>
    );
  }
  
  export default PublicHome;