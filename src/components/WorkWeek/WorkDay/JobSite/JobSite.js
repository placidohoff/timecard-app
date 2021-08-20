import React, { useState, useEffect } from 'react'
import TimeDropDown from '../TimeDropDown/TimeDropDown';
import { useStateValue } from '../../../../util/StateProvider.js'
import { db } from '../../../../util/firebase'
import lunchbreak from '../../../../img/lunch.png'
import './JobSite.css'

function JobSite(props){
    const [{fullName, currentWorkWeek}, dispatch] = useStateValue()
    const [description, setDescription] = useState(props.details.description)
    const [companyName, setCompanyName] = useState(props.details.companyName)
    const index = props.index || 0;
    const [timeIn, setTimeIn] = useState(props.details.timeIn)
    const [timeOut, setTimeOut] = useState(props.details.timeOut)
    const workDayIndex = props.workDayIndex
    const [isLunchBreakApplied, setIsLunchBreakApplied] = useState(props.details.isLunchBreakApplied)
    const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly)

    const siteStyle = props.index !== 0 ? 0 : 0
    const [isSaved, setIsSaved] = useState(props.details.isSaved)
    const getTotal = () => {
        if(Number(timeIn) > Number(timeOut)){
            console.log('TIME CHECK ', timeIn ,timeOut )
            return 'Error'
        }
        else{
            let lunch;
            isLunchBreakApplied? lunch = 30 : lunch = 0;
            if((((timeOut-timeIn)-lunch)/100) % 1 == 0){
                // console.log('no decimal')
                return(((timeOut-timeIn)-lunch)/100)
                
            }

            else{
                // console.log('decimal')
                let num = (((timeOut-timeIn)-lunch)/100).toString().split('.')
                return(num[0]+'.5')
            }
            
        }
        
    }
    const checkTimeInOut = (val, type) => {
        //console.log(val)
        setIsSaved(false)
        if(type == 'in'){
            if(val > timeOut){
                setTimeIn(val)
                setTotal('Error')
                
            }
            else{
            setTimeIn(val)
            // setTimeOut(val)
                //setTotal(((val-timeIn)-30)/100)
                // console.log((((val-timeIn)-30)/100) % 1)
                if((((timeOut-val)-30)/100) % 1 == 0){
                    // console.log('no decimal')
                    setTotal(((timeOut-val)-30)/100)
                }

                else{
                    console.log('decimal')
                    let num = (((timeOut-val)-30)/100).toString().split('.')
                    setTotal(num[0]+'.5')
                }
            }
        }
        else{
            if(val < timeIn){
                // alert('error')
                // null
                setTimeOut(val)
                setTotal('Error')
            }
            else{
                setTimeOut(val)
                //setTotal(((val-timeIn)-30)/100)
                // console.log((((val-timeIn)-30)/100) % 1)
                if((((val-timeIn)-30)/100) % 1 == 0){
                    // console.log('no decimal')
                    setTotal(((val-timeIn)-30)/100)
                }

                else{
                    console.log('decimal')
                    let num = (((val-timeIn)-30)/100).toString().split('.')
                    setTotal(num[0]+'.5')
                }
            }
        }
        // if(timeOut < timeIn)
        //     setTotal('Error')
        //     setTimeIn(timeIn)
        //     setTimeOut(timeOut)
    }
    const [total, setTotal] = useState(getTotal())

    const save = async() => {
        setIsSaved(true)
        props.save({
            description: description,
            companyName: companyName,
            timeIn: timeIn,
            timeOut: timeOut,
            index: props.index,
            isSaved: true,
            total: total,
            isLunchBreakApplied: isLunchBreakApplied

        })
    }


    const push = () => {
        props.save({
            description: description,
            companyName: companyName,
            timeIn: timeIn,
            timeOut: timeOut,
            index: props.index,
            isSaved: true,
            total: getTotal(),
            isLunchBreakApplied: isLunchBreakApplied,
            date: props.date
        }).then((week) => {
            try{db.collection(fullName).doc('--CurrentWeek')
            .set({
                    WorkWeek: currentWorkWeek.weekDays,
                    isCurrentWeekOpen: true,
                    endOfWeek: currentWorkWeek.endOfWeek
                })}
            catch(err){
            console.log(err)
            console.log(currentWorkWeek)
            }})

    }

    const remove = () => {
        console.log('DELETE ', index)
        props.remove(index)
    }

    const toggleLunchBreak = () => {
        //DISPATCH/SET(ISLUNCHBREAKAPPLIED(TRUE/FALSE))

        //ISLUNCHBREAKAPPLIED?
            //SETTOTAL(TOTAL +=.5)
        //:
        //SETTOTAL(TOTAL-= .5)
        setIsLunchBreakApplied(!isLunchBreakApplied)
        console.log(isLunchBreakApplied)
        setTotal(getTotal)
        setIsSaved(false)
                console.log(isLunchBreakApplied)

    }
    
 
     

    useEffect(() => {
        //console.log('HOW MUCH ', props.details)
        //setTotal(8)
        // checkTimeInOut();
        let lunch;
        isLunchBreakApplied ? lunch = 30 : lunch = 0
        if((((timeOut-timeIn)-lunch)/100) % 1 == 0){
            // console.log('no decimal')
            setTotal(((timeOut-timeIn)-lunch)/100)
        }

        else{
            // console.log('decimal')
            let num = (((timeOut-timeIn)-lunch)/100).toString().split('.')
            setTotal(num[0]+'.5')
        }
    },[])

    //CALCULATE TOTAL:
    useEffect(() => {
        setTotal(getTotal())
        // dispatch({
        //             type: 'SET_TOTALS',
        //             item:{
        //                 workDayIndex: workDayIndex,
        //                 jobSiteIndex: index,
        //                 total: total
        //             }
        //         })
        // props.calculateTotal({
        //     siteIndex: props.index,
        //     total: getTotal()
        // })
    },[timeIn, timeOut])

    // useEffect(() => {
    //     dispatch({
    //         type: 'SET_TOTALS',
    //         item:{
    //             workDayIndex: workDayIndex,
    //             jobSiteIndex: index,
    //             total: total
    //         }
    //     })
    // },[total])

    return(
        <div className='jobsite' 
        
            style={{
                marginTop: siteStyle
            }
            }
        >
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                {/* <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                > */}
                    {/* <input type="text" value={date} style={{width: '55px', fontSize:'15px'}} /> */}
                    <input type="text" className="borderBox" value={companyName} disabled={isReadOnly} onChange={e => {setCompanyName(e.target.value); setIsSaved(false)}} style={{width:'147px', fontSize:'12px'}}/>
                    <textarea className="borderBox" value={description} disabled={isReadOnly} onChange={e=> {setDescription(e.target.value); setIsSaved(false)}} rows='4' style={{resize:'none', height:'25px', width: '188px', fontSize:'9px'}}></textarea>
                    <TimeDropDown
                        type='in' 
                        change = {checkTimeInOut}
                        val={timeIn}
                        isReadOnly={isReadOnly}
                    />
                    <TimeDropDown 
                        type='out'
                        change = {checkTimeInOut}
                        val={timeOut}
                        isReadOnly={isReadOnly}
                    />
                                        
                    <input 
                        type="text" 
                        className="borderBox"
                        value={total == 'Error'? 'Error'
                        :
                        isLunchBreakApplied ? 
                            getTotal() + ' hrs(lunch)'
                            :
                            getTotal() + ' hrs'
                        } 
                        style={{width:'60px', cursor:'default', fontSize:'9px'}}
                        disabled={isReadOnly}
                        onClick={toggleLunchBreak}  
                        // onBlur={toggleLunchBreak}
                    />
                    <input type="text" disabled={isReadOnly} value="" style={{width:'60px'}} />

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '2px'}}>
                        {
                            total == 'Error' ?
                            <>
                            &nbsp; <button disabled style={{height: '15px', fontSize:'7px', marginTop: '-25x', flexDirection:'flex-start', width: '40px', backgroundColor:'red', fontWeight:'bold'}}>ERROR</button>
                            </>
                            :
                                isSaved ?
                                <>
                                &nbsp; <button disabled style={{height: '15px', fontSize:'7px', marginTop: '-25px', flexDirection:'flex-start', width: '40px'}}>Saved</button>
                                </>
                                :
                                <>
                                &nbsp; <button onClick={push} style={{height: '15px', fontSize:'7px', marginTop: '-25px', flexDirection:'flex-start', width: '40px', backgroundColor:'#008020', color:'white'}}>Save</button>
                                </>
                        }
                        {
                            !isReadOnly ?
                            <button 
                                style={{cursor:'pointer', fontSize:'7px', height:'14px', width:'40px', marginBottom:'3px', backgroundColor:'#800020', color:'white'}}
                                onClick={remove} 
                                
                            >
                                DELETE
                                {/* <span style={{width: '5px'}}>&#128465;</span> */}
                            </button>
                            :
                            null
                        }
                    </div>
                {/* </div> */}
                
            </div>

        </div>
    )
}

export default JobSite;