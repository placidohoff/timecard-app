export const initialState = {
    superUser: null,
    user: null,
    fullName: null,
    loadedWorKDay: {},
    loadedTimeCard: [{}],
    currentWorkWeek:[{}],
    isNewWeekStarted: false,
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            state.user = action.item.user
            state.fullName = action.item.fullName
            console.log(state.fullName)
            return{
                ...state
                // user: action.item.user,
                // fullName: action.item.fullName
            }
        case 'LOAD_WEEK':
            state.currentWorkWeek = action.item
            return{
                ...state
            }
        case 'NEW_WORK_WEEK':
            state.currentWorkWeek = action.item
            return{
                ...state
            }
        case 'LOAD_CURRENT_WEEK':
            state.currentWorkWeek = action.item
            // console.log(action.item)
            return{
                ...state
            }
        case 'LOAD_CURRENT_WORK_WEEK':
            return{
                
            }
        case 'ADD_WEEK_DAY':
            //state.currentWorkWeek = [...state.currentWorkWeek, action.item]
            state.currentWorkWeek.weekDays[action.item.workDayIndex] = action.item
            //console.log(state.currentWorkWeek)
            // console.log('TESTING...',state.currentWorkWeek.weekDays)
            return{
                //currentWorkWeek: [...state.currentWorkWeek, action.item],
                ...state
            }
        case 'SAVE_WORK_DAY':
            state.currentWorkWeek.weekDays[action.item.workDay.index] = action.item.workDay
            state.currentWorkWeek.weekDays[action.item.workDay.index].date = action.item.date
            console.log('DAATE ', state.currentWorkWeek)
            // console.log('WHY AM I GET 0 ', action.item.workDay)
            return{
                ...state
            }
        case 'ADD_JOB_SITE':
            state.currentWorkWeek.weekDays[action.item.workDayIndex].jobSites[action.item.jobSiteIndex] = action.item
            console.log('ADD SITE ',action.item.jobSiteIndex )
            return{
                ...state
            }
        case 'DELETE_JOB_SITE':
            console.log('DELETE, DELETE')
            let filtered = state.currentWorkWeek.weekDays[action.item.workDayIndex].jobSites.filter(((site, index) => {
                if(index !== action.item.jobSiteIndex)    
                    return site 
            }))
            state.currentWorkWeek.weekDays[action.item.workDayIndex].jobSites = filtered
            return{
                ...state
            }
        case 'DELETE_WORK_DAY':
            let filteredArr = state.currentWorkWeek.weekDays.filter(((day, index) => {
                if(index !== action.item.dayIndex)    
                    return day 
            }))
            state.currentWorkWeek.weekDays = filteredArr
            return{
                ...state
            }
        case 'SET_TOTALS':
            state.currentWorkWeek.weekDays[action.item.workDayIndex].jobSites[action.item.jobSiteIndex].total = action.item.total
            return{
                ...state
            }
        case 'CHANGE_DATE':
            state.currentWorkWeek.weekDays[action.item.dayIndex].isDateChanged = true;
            state.currentWorkWeek.weekDays[action.item.dayIndex].date = action.item.newDate;
            return{
                ...state
            }
        case 'CHANGE_END_OF_WEEK':
            state.currentWorkWeek.endOfWeek = action.item.newDate;
            state.currentWorkWeek.isEndOfWeekChanged = true;
            return{
                ...state
            }
        default:
            return state;
    }
}