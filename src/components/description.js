import React, {Component} from 'react';

export class Description extends Component{

	render(){
		const {list} = this.props; 
		var listOfComponents = list.map((n)=>{
												return n.type === 'T'?<h3>{n.text}</h3>: <p>{n.text}</p>
											}
										); 
		return (
				<div>
					{listOfComponents}
				</div>
			);
	}
}
