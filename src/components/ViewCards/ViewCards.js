import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../util/StateProvider.js';
import HeaderStrip from '../HeaderStrip/HeaderStrip.js'
import { db } from '../../util/firebase.js'

import ListCard from './ListTimeCard/ListCard.js';
import { EmptyWorkWeek } from '../Empty/EmptyWorkWeek.js';
import './ViewCards.css';

function ViewCards(){
    const history = useHistory();
    const [{user, fullName, loadedWorKDay, loadedTimeCard, currentWorkWeek}, dispatch] = useStateValue();
    const [timeCardList, setTimeCardList] = useState([])
    //const [currentWorkWeek, setCurrentWorkWeek] = useState('')
    const [isCurrentWorkWeekOpen, setIsCurrentWorkWeekOpen] = useState(false)
    const toggle = true;

    const newWorkWeek = () => {
        dispatch({
            type: 'NEW_WORK_WEEK',
            item: {
                    weekDays: [
                        {
                            isWorked: false,
                            isFinalized: false,
                            isDateChanged: false,
                            date: '',
                            total: 0,
                            isSaved: false,
                            jobSites: [
                                {
                                    workDayIndex: 0,
                                    jobSiteIndex: 0, 
                                    companyName: '',
                                    description: '',
                                    timeIn: '600',
                                    timeOut: '1430',
                                    total: 8,
                                    isLunchBreakApplied: true
                                }
                            ]
                        }
                    ],
                    isCurrentWorkWeekOpen: true,
                    endOfWeek: '',
                    isEndOfWeekChanged: false
                    // isSaved: false

            }
        })
        
        history.push({
            pathname: '/work',
            state: { type: 'newWeek' }
        
        })
    }

    const loadCurrentWorkWeek = () => {
        dispatch({
            type: 'LOAD_CURRENT_WEEK',
            item: {
                weekDays: timeCardList[0].timecard.WorkWeek,
                isCurrentWorkWeekOpen: true
            }
        })
        
        history.push({
            pathname: '/work',
            state: { type: 'resume' }
        
        })
        // console.log(timeCardList[1].timecard.WorkWeek)
    }


    useEffect(() => {
        if(user === null || fullName === null)
            history.push('/login')
        
        else{
            //Load a list of saved timecards:
            db.collection(fullName)
            .onSnapshot(snapshot => {
                setTimeCardList(snapshot.docs.map(doc => (
                {
                    timecard: doc.data(),
                    id: doc.id
                }

                )))
            })
        }
    },[])

    useEffect(() => {
        if (timeCardList.length > 0){
        // dispatch({
        //     type: 'LOAD_CURRENT_WEEK',
        //     item:{
        //         currentWeek: timeCardList[1].timecard.WeekDays
        //     }
        // })
    }
        
    
    }, [timeCardList])

    return(

        <div className="viewcards">
            <HeaderStrip />

            <br />
            <div
                style={{
                    marginLeft: '20px'
                }}
            >
                {
                    timeCardList.length > 0 &&  timeCardList[0].timecard.isCurrentWeekOpen ?    
                        
                    <button
                        onClick={() => loadCurrentWorkWeek()}
                    >
                        Current Work Week
                    </button>
                
                :
                
                    <button
                         onClick={() => newWorkWeek()}
                    >
                    {console.log(timeCardList)}
                    New Work Week
                    </button>

                }
            </div>

            <br /><br /><br />
            
                {
                    timeCardList.map(timecard => (
                        timecard.id ==="--CurrentWeek" ?

                            null
                        :
                        <>
                        <hr/>
                        <div
                            style={{display:'flex', flexDirection:'row', marginLeft:'20px'}}
                        >
                            
                        <ListCard 
                            timecard={timecard.timecard}
                        />
                            
                        <button
                            style={{height:'30px', marginTop: '0px'}}
                            onClick={e => {db.collection(fullName).doc(timecard.timecard.WeekEnd).delete()}}
                        > 
                            X
                        </button>
                        
                        </div>
                        
                        </>
                    ))
                }
            

        </div>
    )
}

export default ViewCards;