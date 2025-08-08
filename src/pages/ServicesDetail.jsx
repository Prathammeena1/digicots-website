import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ServicesDetailLanding from '../sections/ServicesDetailLanding';





const ServicesDetail = () => {

    const {id} = useParams();
    console.log(id);

  return (
    <div>
        <ServicesDetailLanding/>
    </div>
  )
}

export default ServicesDetail