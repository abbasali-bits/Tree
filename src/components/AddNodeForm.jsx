import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class AddNewNode extends Component{

	constructor(props){
		super(props);
		this.state = {
			title: "",
			body: ""
		};
	}
	handleTitleChange= (event)=> {
			this.setState({
				title: event.target.value 
			});
	}
	handleBodyChange= (event)=> {
			this.setState({
				body: event.target.value 
			});
	}
	render(){
		
		return (
				<div>
				<form>
					<div>
						<label>"Title"</label>
					 	<input type="text" value = {this.state.title} onChange = {this.handleTitleChange}/>
					</div>
					<div>
						<label>"Body"</label>
					 	<textarea type="text" value = {this.state.body} onChange = {this.handleBodyChange}/>
					</div>
				</form>
					<Link to={'/'}> 
						<button onClick = {() => this.props.handleAddNodeSubmit(this.state)}>submit </button> 
					</Link>

				</div>
			);
	}
}

export default AddNewNode;