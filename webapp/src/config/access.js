import ability from './ability';
const access = (action, data) => ability.can(action, data);
export default access;