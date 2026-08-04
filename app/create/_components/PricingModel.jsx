import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function PricingModel() {
    return(
        <div className='my-10'>
            <HeadingDescription 
            title={Lookup.LogoPricingModelTitle}
            description={Lookup.LogoPricingModelDesc}/>

        </div>
    )
}
export default PricingModel