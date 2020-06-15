import React, {Component} from 'react';
import {store} from '../store'

export class Children extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      listOfNodes : this.getChildNodes()
	    }
	}
	getIndex = (id,allNodes)=>{
	    var i;
	    if(allNodes == null)
	    	return -1;
	    for(i=0;i<allNodes.length;i++){
	      if(allNodes[i].id === id)
	        return i;
	    }
	    return -1;
	}
	fun = store.subscribe(()=>{
	    this.setState({
	     	listOfNodes : this.getChildNodes()
	   	});
	});
	getChildNodes = () => {
		const index = this.getIndex(store.getState().currentNode.index,store.getState().nodes.nodes);
		if(index === -1)
  			return null;
	    const node = store.getState().nodes.nodes[index];
	    if(node == null)
	    	return [];
	    if(node.relations == null || node.relations.length === 0)
	    	return [];
	    
	    var children = node.relations[0].nodeIds;  
	    
    	var childNodes = children.map((id)=> {
              return {
                      "id" : id,
                      "title": store.getState().nodes.nodes[this.getIndex(id,store.getState().nodes.nodes)].title
                    }
                  });
    	
    	return childNodes;
	}
	render(){
		const {listOfNodes} = this.state; 
		
		if(listOfNodes == null)
			return null;
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
