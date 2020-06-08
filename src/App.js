import React, {Component} from 'react';
import Node from './components/node';
import AddNewNode from './components/AddNodeForm';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoaded : false,
      allNodes: [],
      currentNodeId : 0,
      currentNode : {},
      childNodes : [],
      parentNode : -1,
      addNodeOn: false
    }
  }
  openNode = id => {
    if(id<0){
      this.setState({
        addNodeOn:false
      });
      return;
    }
    var children = this.state.allNodes[id].relations[0].children;  
    var childNodes = children.map((id)=> {
              return {
                      "id" : id,
                      "title": this.state.allNodes[id].title
                    }
                  });
    this.setState({
        currentNodeId: id,
        parentNode: this.state.allNodes[id].parent,
        currentNode: this.state.allNodes[id],
        childNodes : childNodes,
        addNodeOn: false
    });
  }

  openParentNode = () => {
    this.openNode(this.state.parentNode);
  }
  handleAddNodeSubmit = state => {
    var node = {
      "id":this.state.allNodes.length,
      "body":{"description":[{"text":state.title,"type":"T"},{"text":state.body,"type":"P"}]},"title":state.title,"parent":this.state.currentNodeId,"relations":[{"children":[]}]};
    var nodes = this.state.allNodes;
    nodes.push(node);
    nodes[node.parent].relations[0].children.push(node.id);
    this.setState({
      allNodes: nodes,
      addNodeOn: !this.state.addNodeOn
    });
    this.openNode(this.state.currentNodeId);
    console.log(nodes);
  }
  componentDidMount(){

    var uri = 'https://api.npoint.io/1800ee5d52be1bdea4d6/' ;
    
   
    fetch(uri)
      .then(res => res.json())
      .then(json => {
          var children = json[this.state.currentNodeId].relations[0].children;  
          var childNodes = children.map((id)=> {
              return {
                      "id" : id,
                      "title": json[id].title
                    }
          });

          this.setState({
              isLoaded: true,
              allNodes: json,
              currentNode : json[this.state.currentNodeId],
              childNodes: childNodes
            }
          );
        }
      );
  }
  getAddNodeComponent(){
    if(this.state.addNodeOn)
    return <AddNewNode handleAddNodeSubmit = {this.handleAddNodeSubmit}/>;
  }
  toggleAddNodeOn=()=>{
    this.setState({
      addNodeOn: !this.state.addNodeOn
    });
  }
  render(){
    var {currentNode,isLoaded} = this.state;
    if(isLoaded){
      return (
        <div className="App" style = {{margin:'5%'}}>
          <button className="btn btn-primary m-2" onClick = {this.openParentNode}>{"<< parent "}</button>
          <div>
            <Node node = {currentNode} childNodes = {this.state.childNodes} openNode = {this.openNode} addNewNode = {this.addNewNode}/>
          </div>
          <button className="btn btn-primary m-2" onClick = {this.toggleAddNodeOn}>Add New Node</button>
          {this.getAddNodeComponent()}
        </div>
      );
    }
    else{
      return (
      <div className="App">
        <h1> Loading...</h1>
      </div>
      );
    }
    
  }
}

export default App;
