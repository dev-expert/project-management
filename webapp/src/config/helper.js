import moment from 'moment';
import { updateAbility } from './ability';
const FORMAT = 'MMM DD, YYYY';
export const onLogin = token => {
  localStorage.setItem('authToken', token);
  updateAbility(token);
}

export const onLogout = () => {
  localStorage.removeItem('authToken');
}
export function formatDate(date, format) {
  return date ?  moment(date).format(format||FORMAT) : '';
}
export const getRouteName = path => {
  const starts = (testVal) => path && path.startsWith(testVal);
  switch (true) {
    case starts('/projects'):
      return 'Projects';
    case starts('/users'):
      return 'Users';
    case starts('/timesheet'):
      return 'Timesheet';
    case starts('/reports'):
      return 'Reports';
    default:
      return 'Common';
  }
}