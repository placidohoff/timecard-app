import { EmptyWorkDay } from './EmptyWorkDay';
import { useStateValue } from '../../util/StateProvider';

// import { useStateValue } from '../../util/StateProvider';

export const EmptyWorkWeek = {
    weekDays: [
        EmptyWorkDay,
        EmptyWorkDay,
        EmptyWorkDay,
        EmptyWorkDay,
        EmptyWorkDay,
        EmptyWorkDay,
        EmptyWorkDay
    ],
    employeeName: '',
    weeksEnd: '',
    comments: '',
    totalHours: 0
    // isSaved: false
}