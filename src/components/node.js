import React, {Component} from 'react';
import {Description} from './description';
import {Children} from './children';

class Node extends Component{

	render(){
		const {title,body} = this.props.node;
		const {childNodes,openNode} = this.props;
		return (
				<div>

					<h1>{title}</h1>
					<Description list = {body.description}/>
					<div>
						<Children listOfNodes = {childNodes} openNode = {openNode}/>
					</div>
				</div>
			);
	}
}

export default Node;