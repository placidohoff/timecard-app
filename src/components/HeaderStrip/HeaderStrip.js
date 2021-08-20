import React from 'react'
import { useStateValue } from '../../util/StateProvider'
import './HeaderStrip.css'

function HeaderStrip(){

const [{user, fullName}, dispatch] = useStateValue();

    return(
        <div className="headerstrip">
            <p style={{padding:'10px'}}>Welcome {fullName}</p>
        </div>
    )
}

export default HeaderStrip;