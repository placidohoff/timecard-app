import React from 'react'
import { useStateValue } from '../../../util/StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from '../../../util/firebase'

function ListCard(props){

    const [{user, fullName}, dispatch] = useStateValue();
    const history = useHistory();

    const loadWorkWeek = () => {
        //alert('hello')
        dispatch({
            type: 'LOAD_WEEK',
            item: {
                weekDays: props.timecard.WorkWeek
            }
        })

        history.push({
            pathname: '/work',
            state: { type: 'viewWeek' }
        
        })
    }

    // dispatch({
    //     type: 'NEW_WORK_WEEK',
    //         item: {
    //                 weekDays: [
    //                     {
    //                         isWorked: false,
    //                         isFinalized: false,
    //                         isDateChanged: false,
    //                         date: '',
    //                         companyName: '',
    //                         description: '',
    //                         timeIn: '',
    //                         timeOut: '',
    //                         total: 0,
    //                         isSaved: false,
    //                         jobSites: [
    //                             {
    //                                 workDayIndex: 0,
    //                                 jobSiteIndex: 0, 
    //                                 companyName: '',
    //                                 description: '',
    //                                 timeIn: '600',
    //                                 timeOut: '1430',
    //                                 total: 8,
    //                                 isLunchBreakApplied: true
    //                             }
    //                         ]
    //                     }
    //                 ],
    //                 isCurrentWorkWeekOpen: true,
    //                 endOfWeek: '',
    //                 isEndOfWeekChanged: false
    //                 // isSaved: false

    //         }
    // })

    

    return(
        <div className='listcard'
            onClick={e => loadWorkWeek()}
            style={{
                width:'200px',
                border:'1px solid black',
                marginRight: '10px',
                paddingLeft: '10px'
            }}
        >
            {/* <hr /> */}
            <p>{props.timecard.WeekEnd}</p> 
            <p>Total Hours: {props.timecard.TotalHours}</p> 
            {/* <hr /> */}
            {/* hello */}
            {console.log(props)}
        </div>
    )
}

export default ListCard;