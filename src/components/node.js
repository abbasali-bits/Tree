import React, {Component} from 'react';
import {Description} from './description';
import {Children} from './children';
import {store} from '../store'
class Node extends Component{

	constructor(props){
    	super(props);
	    this.state = {
	      title: this.getTitle(),
	      delete: props.delete
	    }
  	}
  	fun = store.subscribe(()=>{
	    this.setState({
	     	title: this.getTitle()
	   	});
	});
	getIndex = (id,allNodes)=>{
	    var i;
	    if(allNodes == null)
	    	return -1;
	    for(i=0;i<allNodes.length;i++){
	      if(allNodes[i].id == id)
	        return i;
	    }
	    return -1;
	}
  	getTitle = () => {
  		const index = this.getIndex(store.getState().currentNode.index,store.getState().nodes.nodes);
  		if(index === -1)
  			return null;
	    const node = store.getState().nodes.nodes[index];
	    if(node==null)
	    	return null;
	    return node.title;
  	}
	render(){
		const {title} = this.state;
		const {openNode} = this.props;
		return (
				<div>

					<h1>{this.state.title}</h1>
					<Description />
					<div>
						<Children openNode = {openNode}/>
					</div>
					<button className="btn btn-primary m-2" onClick = {this.state.delete}>DeleteNode</button>
				</div>
			);
	}
}

export default Node;