import { connect } from 'react-redux';
import * as AppActions from '../../actions/appActions';
import * as UserActions from '../../actions/userActions';
import * as ProjectActions from '../../actions/projectActions';
import * as TaskActions from '../../actions/taskActions';
import * as RoleActions from '../../actions/roleActions';
import * as CommentActions from '../../actions/commentActions';
import { withRouter } from 'react-router-dom';
function mapStateToProps(state) {
	const { AppReducer, UserReducer, ProjectReducer, TaskReducer, RoleReducer } = state;
	return {
        ...AppReducer, ...UserReducer, ...ProjectReducer, ...TaskReducer, ...RoleReducer
	}
}

const getConnect = component => {
    return connect(mapStateToProps, {
        ...AppActions, ...UserActions, ...ProjectActions, ...TaskActions, ...RoleActions,...CommentActions
    })(withRouter(component))
}

export default getConnect;
