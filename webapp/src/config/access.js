import ability from './ability';
const access = (action, data) => {
	return ability.can(action, data)
};
export default access;
