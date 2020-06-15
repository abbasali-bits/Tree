import React, {Component} from 'react';
import {store} from '../store'

export class Description extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      list : this.getListFromStore()
	    }
	}
	fun = store.subscribe(()=>{
	    this.setState({
	     	list:this.getListFromStore()
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
	getListFromStore = () => {
		const index = this.getIndex(store.getState().currentNode.index,store.getState().nodes.nodes)
		if(index === -1)
  			return null;
		const node = store.getState().nodes.nodes[index];
		if(node == null)
			return [];
	    return node.body;
	}
	render(){
		const {list} = this.state; 
		var listOfComponents = list==null? null:list.map((n)=>{
												return n.type === 'T'?<h3>{n.text}</h3>: <p>{n.text}</p>
											}
										) ; 
		return (
				<div>
					{listOfComponents}
				</div>
			);
	}
}
