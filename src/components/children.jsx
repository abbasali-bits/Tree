import React, {Component} from 'react';

export class Children extends Component{

	render(){
		const {listOfNodes} = this.props; 
		var listOfComponents = listOfNodes.map((n)=>{
												return <li className="col-6 col-md-4" onClick = {() => this.props.openNode(n.id)}>{n.title}</li>
											}
										); 
		return (
				<div>
					<h5>Children nodes</h5>
					<ul className = "row">
						{listOfComponents}
					</ul>
				</div>
			);
	}
}
