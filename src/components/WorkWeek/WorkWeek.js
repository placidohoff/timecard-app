import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useStateValue } from '../../util/StateProvider.js'
import WorkDay from './WorkDay/WorkDay.js'
import './WorkWeek.css'
import { db } from '../../util/firebase.js'
// import { Container, Row, Col } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'


function WorkWeek(props){
    const [{user, fullName, loadedTimeCard, currentWorkWeek}, dispatch] = useStateValue();
    const history = useHistory();
    const location = useLocation();
    const [dayTotals, setDayTotals] = useState([])

    const getTotalHours = () => {
        if(location.state.type == 'resume'){
            let tot = 0;
            currentWorkWeek.weekDays.forEach((day, index) => {
                //alert(site.total)
                day.jobSites.forEach(site => {
                    tot += Number(site.total)
                })
            })
            // setTotalHours(tot);
            
            return(tot)
        }
        else{
            //Do 'loadedTimeCard' not currentWorkWeek
            //OR: If it is 'newWeek', calculate as above:
            let tot = 0;
            currentWorkWeek.weekDays.forEach((day, index) => {
                //alert(site.total)
                day.jobSites.forEach(site => {
                    tot += Number(site.total)
                })
            })
            // setTotalHours(tot);
            return(tot)
            // 
        }
    }
    const [totalHours, setTotalHours] = useState(getTotalHours())

    const addNew = (e) => {
        // if(location.state.type === 'resume'){

        // }
        // console.log('ADDDD ',currentWorkWeek)
        dispatch({
            type: 'ADD_WEEK_DAY',
            item: {
                
               date: 'test',
               workDayIndex: currentWorkWeek.weekDays.length,
               isDateChanged: false,
               jobSites: [
                   {
                        companyName: '',
                        description: '',
                        timeIn: 600,
                        timeOut: 1430,
                        total: 8,
                        isLunchBreakApplied: true
                   }
               ] 
            }
        })
    }

    const save = (e) => {
        // alert(fullName)
        try{db.collection(fullName).doc('--CurrentWeek').set({
            WorkWeek: currentWorkWeek.weekDays,
            isCurrentWeekOpen: true
        })}
        catch(err){
          console.log(err)
        }
    }

    const deleteCard = () => {
        try{db.collection(fullName).doc('--CurrentWeek').set({
            WorkWeek: [{}],
            isCurrentWeekOpen: false
        })}
        catch(err){
          console.log(err)
        }

        history.push('/viewcards')
    }

    const finalize = () => {
        let weekName = prompt("Please enter this week's finish date")
        try{db.collection(fullName).doc('--CurrentWeek').set({
            WorkWeek: currentWorkWeek.weekDays,
            isCurrentWeekOpen: false
        })}
        catch(err){
          console.log(err)
        }
        try{db.collection(fullName).doc(weekName).set({
            WorkWeek: currentWorkWeek.weekDays,
            Comments:'',
            EmployeeName: fullName,
            TotalHours: totalHours,
            WeekEnd: weekName
        })
        history.push('/viewcards')
        }
        catch(err){
          console.log('ERRRROR ',err)
        }
    }

    const dailyTotals = (obj) => {
        console.log('TEST.....',obj.dayTotal)
        // setTotalHours(obj.dayTotal)


        let tot = 0;
        currentWorkWeek.weekDays.forEach((day, index) => {
            //alert(site.total)
            // tot += Number(day.total)
            // console.log('QUE ', day)
            day.jobSites.forEach(site => {
                tot += Number(site.total)
            })
        })

        console.log('OTHER TEST...', tot)
        setTotalHours(tot)
    }

    const calculateTotalWeekHours = (obj) => {
        let tot = 0;
        currentWorkWeek.weekDays[obj.dayIndex].total = obj.amount
        
        currentWorkWeek.weekDays.forEach((site,index) => {
            tot += site.total
        })

        setTotalHours(tot)
        console.log('TOTAL WEEK: ', tot)
    }

    const getEndOfWeek = () => {
            if(location.state.type == 'resume'){
                // return props.endOfWeek
                return currentWorkWeek.endOfWeek
            }
            else if(location.state.type == 'newWeek'){
                let separator = '/'
                let spacer = ' '
                let newDate = new Date()
                let date = newDate.getDate() + 6;
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();

                // return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
                return ` ${ month<10?`0${month}`:`${month}` } ${separator} ${date<10?`0${date}`:`${date}` } ${spacer}${separator}${spacer} ${year}`
            }
            else if(location.state.type == 'viewWeek'){
                return loadedTimeCard.endOfWeek
            }
    }

    const [endOfWeek, setEndOfWeek] = useState(getEndOfWeek());
    const [isEndOfWeekChanged, setIsEndWeekChanged] = useState(currentWorkWeek.isEndOfWeekChanged)

    const pushEndWeekChange = () => {
        dispatch({
            type: 'CHANGE_END_OF_WEEK',
            item: {
                newDate: endOfWeek
            }
        })
    }

    const [isReadOnly, setIsReadOnly] = useState('')
    const getDate = (index) => {
            let separator = '/'
                let spacer = ' '
                let newDate = new Date()
                let date = newDate.getDate() + index;
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();

                // return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
                return ` ${ month<10?`0${month}`:`${month}` } ${separator} ${date<10?`0${date}`:`${date}` } ${spacer}${separator}${spacer} ${year}`
    }


    useEffect(() => {
        if(user === null || fullName === null){
            history.push('/login')
        }
        // console.log('YOOOOOO..',currentWorkWeek, user , fullName )
        //setTotalHours(getTotalHours())
        location.state.type === 'viewWeek' ? setIsReadOnly(true) : setIsReadOnly(false)
        // console.log(isReadOnly, 'REEED')
    },[])

    return(
        <div className="workweek">


            <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    {/* <p
                        style={{
                            
                            marginRight:'20px'
                        }}
                    >
                        RCI
                    </p> */}


                    <p
                        style={{
                            // marginTop: '20px'
                            margin: 'auto',
                            marginTop: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        EMPLOYEE'S TIME CARD
                    </p>
                </div>
                
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '10px'
                    }}
                >
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {/* <p style={{marginRight: '20px'}}>First,</p>
                        <p style={{marginRight: '20px'}}>Middle,</p>
                        <p style={{marginRight: '60px'}}>Last,</p> */}
                    </div>
                    <input type="text" className="bevel" value="W/E (mm/dd/yyyy)" style={{marginTop:'10px', marginLeft:'202px'}} />
                    <input type="text" className="bevel" value="Vac. Total" style={{marginTop:'10px', width:'60px'}} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    
                    <input type="text" className="bevel" value='Name: Test User' style={{width:'202px'}}/>
                    <input type="text" className="bevel" value={endOfWeek} onBlur={pushEndWeekChange} onChange={e => {setEndOfWeek(e.target.value); setIsEndWeekChanged(true)}} style={{}} />
                    <input type="text" className="bevel" value="" style={{width:'60px'}} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop:'2px'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '0px'
                    }}
                >
                    <input type="text" className="bevel" value="Date:" style={{width: '55px'}} />
                    <input type="text" className="bevel" value='Company Name:' style={{ width:'147px'}}/>
                    <input type="text" className="bevel" value="Description:" style={{}} />
                    <input type="text" className="bevel" value="In" style={{ width:'60px', textAlign:'center'}} />
                    <input type="text" className="bevel" value="Out" style={{ width:'60px',textAlign:'center'}} />
                    <input type="text" className="bevel" value="Total" style={{ width:'60px'}} />
                    <input type="text" className="bevel" value="RC/PW" style={{ width:'60px'}} />
                
                </div>
                
            </div>
            <hr />

            {
                // NEW/CURRENT TIMECARD
                location.state.type === 'newWeek' ?
            
                    currentWorkWeek.weekDays.map((workDay, index) => (
                        <WorkDay 
                            isNewWeek={true}
                            index={index}
                            key={Math.random()}
                            details={workDay}
                            calculateTotalWeekHours={calculateTotalWeekHours}
                            getDailyTotals={dailyTotals}
                            isReadOnly={isReadOnly}
                            date={getDate(index)}
                        />
                    ))
                    // console.log(currentWorkWeek)
                
                :
                //RESUME CURRENT-WEEK
                location.state.type === 'resume' ?
                    currentWorkWeek.weekDays.map((workDay, index) => (
                        <WorkDay 
                            isCurrentWeek={true}
                            isNewWeek={false}
                            details={workDay} 
                            key={Math.random()}
                            index={index}
                            calculateTotalWeekHours={calculateTotalWeekHours}
                            getDailyTotals={dailyTotals}
                            isReadOnly={isReadOnly}
                            date={getDate(index)}
                        />
                    ))
                    :
                    //VIEWING OLD TIMECARD(MUST BE READONLY)
                    currentWorkWeek.weekDays.map((workDay, index) => (
                        <WorkDay 
                            isNewWeek={false}
                            details={workDay} 
                            key={Math.random()}
                            index={index}
                            // calculateTotalWeekHours={calculateTotalWeekHours}
                            getDailyTotals={dailyTotals}
                            isReadOnly={isReadOnly}
                            date={getDate(index)}
                        />
                    ))
            }
            <p>Total: {totalHours} hrs</p>
            {
                location.state.type === 'newWeek' || location.state.type === 'resume' ?
                <>
                    <br />
                    <button onClick={addNew}>
                        Add New
                    </button>
                    <br/><br/><br />
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <button onClick={finalize}>
                            Finalize Week
                        </button>
                        <button onClick={deleteCard}>
                            Delete Time Card
                        </button>
                    </div>
                </>
                :
                    null
            }

        </div>
    )
}

export default WorkWeek;