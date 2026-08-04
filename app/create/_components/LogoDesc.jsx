import HeadingDescription from "./HeadingDescription"
import React from "react"
import Lookup from "@/app/_data/Lookup"
function LogoDesc({onHandleInputChange,formData}){
    return (
        <div className='my-10'>
            <HeadingDescription 
            title={Lookup?.LogoDescTitle}
            description={Lookup?.LogoDescDesc}/>

            <input type="text" placeholder={Lookup.InputTitlePlaceholder}
                        className='p-4 border rounded-lg w-full mt-5'
                        //defaultValue={formData?.desc}
                        value={formData.desc}
                        onChange={(e) => onHandleInputChange(e.target.value)}
                        />

            
    
        </div>
    )
}

export default LogoDesc