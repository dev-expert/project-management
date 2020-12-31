import moment from 'moment';
import { updateAbility } from './ability';
const FORMAT = 'MMM DD, YYYY';
export const onLogin = token => {
  localStorage.setItem('authToken', token)
  updateAbility();
}

export const onLogout = () => {
  localStorage.removeItem('authToken');
}
export function formatDate(date, format) {
  return date ?  moment(date).format(format||FORMAT) : '';
}
export const starts = (val, testVal) => val ? val.startsWith(testVal) : false;
export const getRouteName = path => {
  switch (true) {
    case starts(path, '/projects'):
      return 'Projects';
    case starts(path, '/users'):
      return 'Users';
    case starts(path, '/tasks'):
      return 'Tasks';
    default:
      return 'Common';
  }
}