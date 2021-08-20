import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../util/StateProvider.js'
import JobSite from './JobSite/JobSite.js'
// import { TimeDropDown } from './TimeDropDown.js'
import TimeDropDown from './TimeDropDown/TimeDropDown.js'
import './WorkDay.css'

function WorkDay(props){

    const [{fullName, currentWorkWeek}, dispatch] = useStateValue()
    const checkDate = () => {
        if(props.isNewWeek || props.isCurrentWeek){
            if(!isDateChanged){
                let separator = '/'
                let spacer = ' '
                let newDate = new Date()
                let date = newDate.getDate() + props.index;
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();
                setIsDateChnged(false)

                // return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
                return ` ${ month<10?`0${month}`:`${month}` } ${separator} ${date<10?`0${date}`:`${date}` } ${spacer}${separator}${spacer} ${year}`
            }else{
                console.log('DATE ', props.details.date)
                setIsDateChnged(true)
                return props.details.date
            }
        }
        else{
            setIsDateChnged(true)
            return props.details.date
            // console
        }
    }
    const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly)

    const [isDateChanged, setIsDateChnged] = useState(props.details.isDateChanged)

    const [date, setDate] = useState(checkDate)
    const [description, setDescription] = useState(props.details.description)
    const [companyName, setCompanyName] = useState(props.details.companyName)
    
    const [timeIn, setTimeIn] = useState(props.details.timeIn)
    const [timeOut, setTimeOut] = useState(props.details.timeOut)
    
    const [isSaved, setIsSaved] = useState(props.details.isSaved)
    const [isTimeError, setIsTimeError] = useState(false)
    const [hasMultipleSites, setHasMultipleSites] = useState(false)
    const [otherSites, setOtherSites] = useState(props.details.otherSites)
    const [jobSites, setJobSites] = useState(props.details.jobSites) 


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
                alert('error')
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

    const getWorkDayTotal = () => {
        let tot = 0;
        jobSites.forEach((site, index) => {
            //alert(site.total)
            tot += Number(site.total)
        })
        // console.log('TOTAL ', tot)
        props.getDailyTotals({
            dayIndex: props.index,
            dayTotal: tot
        })

        // console.log('OTHER OTHER TEST..', tot)
        return tot;
        
    }

    const getJobSitesTotal = () => {
        let tot = 0;
        jobSites.forEach((site, index) => {
            //alert(site.total)
            tot += Number(site.total)
        })
        return tot
    }

    const [total, setTotal] = useState(getWorkDayTotal())

    const save = (e) =>  {
        // console.log('que')

            if(total == 'Error'){

            }
            else{
                // setIsSaved(true)
                // console.log(isSaved)
                // console.log('isSaved')
                dispatch({
                    type: 'SAVE_WORK_DAY',
                    item:{
                        workDay:{
                            index: props.index,
                            date: date,
                            total: getWorkDayTotal(),
                            jobSites: jobSites,
                            isSaved: true

                        }
                    }
                })
                // console.log('IS SAVED...?')
                return currentWorkWeek; 
            }
    }

    const addJobSite = (e) => {
        // alert('hey')
        dispatch({
            type: 'ADD_JOB_SITE',
            item:{
                workDayIndex: props.index,
                jobSiteIndex: jobSites.length, 
                companyName: '',
                description: '',
                timeIn: '600',
                timeOut: '1430',
                total: 8,
                isLunchBreakApplied: true
            }
        })
    }



    const saveJobSite = async (site) => {
        jobSites[site.index] = site
        //getWorkDayTotal();
        // save();
        dispatch({
            type: 'SAVE_WORK_DAY',
            item:{
                workDay:{
                    index: props.index,
                    date: jobSites[0].date,
                    total: getWorkDayTotal(),
                    jobSites: jobSites,
                    isSaved: true,
                    isDateChanged: isDateChanged

                },
                date: date
            }
        })
        return currentWorkWeek
    }

    const removeJobSite = (num) => {
        // let filtered = state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries.filter(section => {
        //     return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries[action.item.subEntryIndex]
        // })

        // setJobSites(jobSites.filter((job, index) => {
        //     //console.log(job)
        //     if(index !== num)
        //         return job
        //     //return job.jobSiteIndex !== index
        // }))
        dispatch({
            type: 'DELETE_JOB_SITE',
            item:{
                workDayIndex: props.index,
                jobSiteIndex: num  

            }
        })
        // console.log(num)
        
        // save();
    }

    const calculateTotal = (obj) => {
        let amount = 0;
        //alert('hello')
        jobSites[obj.siteIndex].total = obj.total
        jobSites.forEach((site,index) => {
            amount += site.total
        })
        setTotal(amount)
        props.calculateTotalWeekHours({
            amount: amount,
            dayIndex: props.index
        })
    }

    const changeDate = () => {
        dispatch({
            type: 'CHANGE_DATE',
            item:{
                dayIndex: props.index,
                newDate: date
            }
        })
        // console.log('CHANGE DATE')
    }

    useEffect(() => {
        if(Number(total) < 0 || total == 'Error')
            // alert('error')

        if(timeIn > timeOut){
            // alert('error')
            setIsTimeError(true)
        }
        else
            setIsTimeError(false)

        //getWorkDayTotal();
        
        


    },[total])

    useEffect(() => {
        // //setTotal(((val-timeIn)-30)/100)
        // // console.log((((val-timeIn)-30)/100) % 1)
        // if((((timeOut-timeIn)-30)/100) % 1 == 0){
        //     // console.log('no decimal')
        //     setTotal(((timeOut-timeIn)-30)/100)
        // }

        // else{
        //     let num = (((timeOut-timeIn)-30)/100).toString().split('.')
        //     setTotal(num[0]+'.5')
        // }

        // console.log("TEST.. ",props )
        if(jobSites.length == 0){
            dispatch({
                type: 'DELETE_WORK_DAY',
                item: {
                    dayIndex: props.index
                }
            })
        }
        // console.log(props.index)
        getWorkDayTotal();
    },[])


    return(
        <div className='workday' 
            style={{
                marginTop: '1px'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    
                    <input type="text" className='borderBox' value={date} disabled={props.isReadOnly} onChange={e => {setDate(e.target.value); setIsDateChnged(true) } } onBlur={changeDate} style={{maxWidth: '55px', fontSize:'13px'}} />
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'column'
                        }} 
                    >
                        {
                            jobSites.length > 0 ?
                                jobSites.map((site, index) => (
                                    <JobSite 
                                        details={site}
                                        //change={changeOtherSiteDetails}
                                        index={index}
                                        workDayIndex={props.index}
                                        save={saveJobSite}
                                        startTime={timeOut}
                                        remove={removeJobSite}
                                        calculateTotal={calculateTotal}
                                        isReadOnly={isReadOnly}
                                        date={date}
                                    />
                                ))
                            :
                                <p>null</p>
                        }
                    </div>
                    {/* <div>
                    <input type="text" value={companyName} onChange={e => {setCompanyName(e.target.value); setIsSaved(false)}} style={{height: '25px', width:'147px'}}/>
                    <textarea value={description} onChange={e=> {setDescription(e.target.value); setIsSaved(false)}} rows='5' style={{height:'25px', resize:'none', width: '163px', fontSize:'11px'}}></textarea>
                    <TimeDropDown
                        type='in' 
                        change = {checkTimeInOut}
                        val={timeIn}
                    />
                    <TimeDropDown 
                        type='out'
                        change = {checkTimeInOut}
                        val={timeOut}
                    />
                                        
                    <input type="text" value={total == 'Error'? 'Error': total + ' hrs'} style={{height:'25px', width:'60px'}} />
                    <input type="text" value="" style={{height:'25px', width:'60px'}} />
                    {
                        
                    }
                    {
                        total == 'Error' ?
                        <>
                        &nbsp; <button disabled>ERROR</button>
                        </>
                         :
                            isSaved ?
                            <>
                            &nbsp; <button disabled>Saved</button>
                            </>
                            :
                            <>
                            &nbsp; <button onClick={save} style={{height: '25px', fontSize:'11px', marginTop: '3px'}}>Save</button>
                            </>
                    }
                </div>
                 */}
                </div>
                
            </div>
            {/* {
                otherSites.length > 0 ?
                    otherSites.map((jobSite, index) => (
                        <JobSite 
                            details={jobSite}
                            change={changeOtherSiteDetails}
                            index={index}
                            save={saveJobSite}
                            startTime={timeOut}
                        />
                    ))
                :
                    null
            } */}
            {
            !isReadOnly?
            <div style={{marginLeft: '55px'}}>
                + <button 
                    style={{fontSize: '10px'}}
                    onClick={addJobSite}
                    >
                        Add Job Site
                    </button>
            </div>
            :
            null
            }
            <hr />
        </div>
    )
}

export default WorkDay;