import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';


const StyledButton = styled(Button)({
	width: '84px',
	height: '38px',
	color: '#FFFFFF',
	backgroundColor: '#0F59A5'
});


const Comment = ({comment}) => {

	return (
		<div
			className="comment"
		>
			<div className="comment__user">
				<Avatar alt="Remy Sharp" src="https://picsum.photos/200/200" />
				<div>
					<div
						className="title">
						<h5>Ramesh Yadav</h5>

						<p className="role">Content Writer</p>
					</div>
					<div className="body">
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ex totam consequuntur eos! Facere, beatae rerum, tempora eligendi aliquam consequuntur earum iste illo voluptatum itaque explicabo, magnam impedit doloribus quisquam?</p>
					</div>
				</div>
			</div>
			<div className="comment__detail">
				<p className="comment__time">2 seconds ago</p>
			&nbsp;&nbsp;&nbsp;
			<p className="comment__delete">Delete</p>
			</div>

		</div>
	)
}

const CommentBox = (props) => {
	const [comment,setComment] = useState('');
	const addComment = () => {
		if(!comment){
			return;
		}
		props.onAddComment(comment);

	}
	return (
		<div className="comment__box">
			<Avatar alt="Remy Sharp" src="https://picsum.photos/200/200" />
			<div className="input__box">
				<input type="text" value={comment}
				onChange={(e) => setComment(e.target.value)}
				className="input__box" placeholder="Write a comment" />
				<StyledButton onClick={addComment}>
					SEND
				  </StyledButton>
			</div>
		</div>
	)
}


const Comments = ({comments, onAddComment}) => {
	return (
		<div className="comments" >
			{comments.map((comment) => {
				return (
					<Comment comment={comment}/>
				)
			})}
			<CommentBox onAddComment={onAddComment}/>
		</div>


	)
}

export default Comments
