import { connect } from 'react-redux';
import * as AppActions from '../../actions/appActions';
import * as UserActions from '../../actions/userActions';
import * as ProjectActions from '../../actions/projectActions';
import * as TaskActions from '../../actions/taskActions';
import { withRouter } from 'react-router-dom';
function mapStateToProps(state) {
	const { AppReducer, UserReducer, ProjectReducer, TaskReducer } = state;
	return {
        ...AppReducer, ...UserReducer, ...ProjectReducer, ...TaskReducer
	}
}

const getConnect = component => {
    return connect(mapStateToProps, {
        ...AppActions, ...UserActions, ...ProjectActions, ...TaskActions
    })(withRouter(component))
}

export default getConnect;