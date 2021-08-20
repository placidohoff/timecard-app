import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../../util/StateProvider';

function TimeDropDown(props){


    
    return(
<select className="borderBox" value={props.val} disabled={props.isReadOnly} onChange={e => props.change(e.target.value, props.type)} type="text" style={{height:'25px', fontSize:'11px', width:'60px'}}>
    <option value='0600'>6:00AM</option>
    <option value='0630'>6:30AM</option>
    <option value='0700'>7:00AM</option>
    <option value='0730'>7:30AM</option>
    <option value='0800'>8:00AM</option>
    <option value='0830'>8:30AM</option>
    <option value='0900'>9:00AM</option>
    <option value='0930'>9:30AM</option>
    <option value='1000'>10:00AM</option>
    <option value='1030'>10:30AM</option>
    <option value='1100'>11:00AM</option>
    <option value='1130'>11:30AM</option>
    <option value='1200'>12:00PM</option>
    <option value='1230'>12:30PM</option>
    <option value='1300'>1:00PM</option>
    <option value='1330'>1:30PM</option>
    <option value='1400'>2:00PM</option>
    <option value='1430'>2:30PM</option>
    <option value='1500'>3:00PM</option>
    <option value='1530'>3:30PM</option>
    <option value='1600'>4:00PM</option>
    <option value='1630'>4:30PM</option>
    <option value='1700'>5:00PM</option>
    <option value='1730'>5:30PM</option>
    <option value='1800'>6:00PM</option>
    <option value='1830'>6:30PM</option>
    <option value='1900'>7:00PM</option>
    <option value='1930'>7:30PM</option>
    <option value='2000'>8:00PM</option>
    <option value='2030'>8:30PM</option>
    <option value='2100'>9:00PM</option>
    <option value='2130'>9:30PM</option>
    <option value='2200'>10:00PM</option>
    <option value='2230'>10:30PM</option>
    <option value='2300'>11:00PM</option>
    <option value='2330'>11:30PM</option>
    <option value='0000'>12:00AM</option>
</select>
    )
}

export default TimeDropDown;