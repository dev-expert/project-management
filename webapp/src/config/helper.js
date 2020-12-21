import moment from 'moment';
const FORMAT = 'MMM DD, YYYY';
export const onLogin = token => {
  localStorage.setItem('authToken', token)
}

export const onLogout = () => {
  localStorage.removeItem('authToken');
}
export function formatDate(date, format) {
  return date ?  moment(date).format(format||FORMAT) : '';
}
