import { connect } from 'react-redux';
import * as AppActions from '../actions/appActions';
import * as UserActions from '../actions/userActions';
import * as ProjectActions from '../actions/projectActions';

function mapStateToProps(state) {
	const { AppReducer, UserReducer, ProjectReducer } = state;
	return {
        ...AppReducer, ...UserReducer, ...ProjectReducer
	}
}

const getConnect = component => {
    return connect(mapStateToProps, {
        ...AppActions, ...UserActions, ...ProjectActions
    })(component)
}

export default getConnect;