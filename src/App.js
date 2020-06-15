import React, {Component} from 'react';
import Node from './components/node';
import AddNewNode from './components/AddNodeForm';
import GoogleBtn from './components/googleBtn'
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {useSelector} from 'react-redux';
import {store} from './store'
import {updateCurrentNodeIndex} from './actions'
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoaded : true,
      addNodeOn: false,
      isLoggedIn: store.getState().isLogged.isLoggedIn,
    }
  }

  fun = store.subscribe(()=>{
    this.setState({
      isLoggedIn: store.getState().isLogged.isLoggedIn,
      isLoaded: store.getState().nodes.isLoaded
    });
  });
  getIndex = (id,allNodes)=>{
    var i;
    if(allNodes==null)
      return -1;
    for(i=0;i<allNodes.length;i++){
      if(allNodes[i].id === id)
        return i;
    }
    return -1;
  }
  openNode = id => {
  
    const index = this.getIndex(id,store.getState().nodes.nodes);
    if(index<0){
      this.setState({
        addNodeOn:false
      });
      return;
    }
    store.dispatch(updateCurrentNodeIndex(id));
  }

  openParentNode = () => {
    var id = store.getState().currentNode.index;
    var parentId = store.getState().nodes.nodes[this.getIndex(id,store.getState().nodes.nodes)].parent;
    this.openNode(parentId);
  }
  handleAddNodeSubmit = state => {
    this.setState({
      addNodeOn: false
    });
    var node = {
      "emailId": store.getState().isLogged.emailId,
      "body":[{"text":state.title,"type":"T"},{"text":state.body,"type":"P"}],
      "title":state.title,
      "parent":store.getState().currentNode.index
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'token_id': store.getState().isLogged.tokenId },
        body: JSON.stringify(node)
    };
    fetch('http://heroku-root.herokuapp.com/node/save', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data);this.loadData();});
    const id = store.getState().currentNode.index;
    
    console.log("HandelSubmit");
    console.log(id);
    this.openNode(id);
  }
  // componentDidMount(){
  //   console.log("componentDidMount called");
  //   var uri = 'https://api.npoint.io/1800ee5d52be1bdea4d6/' ;
  //   fetch(uri)
  //     .then(res => res.json())
  //     .then(json => {
  //         var children = json[this.state.currentNodeId].relations[0].children;  
  //         var childNodes = children.map((id)=> {
  //             return {
  //                     "id" : id,
  //                     "title": json[id].title
  //                   }
  //         });

  //         this.setState({
  //             isLoaded: true,
  //             allNodes: json,
  //             currentNode : json[this.state.currentNodeId],
  //             childNodes: childNodes
  //           }
  //         );
  //       }
  //     );
  // }
  getAddNodeComponent(){
    if(this.state.addNodeOn)
    return <AddNewNode handleAddNodeSubmit = {this.handleAddNodeSubmit}/>;
  }
  toggleAddNodeOn=()=>{
    this.setState({
      addNodeOn: !this.state.addNodeOn
    });
  }
  loadData = () =>{
    console.log("lodingData");
    var uri =  "http://heroku-root.herokuapp.com/nodes";
    const requestOptions = {
        crossDomain:true,
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'token_id': store.getState().isLogged.tokenId}
    };
    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(data => {
            const wasLoaded = this.state.isLoaded;
            store.dispatch({
              type: 'SAVE',
              payload: {
                nodes : data.nodes,
                isLoaded: true
              }
            });
            console.log("LoadedData");
            console.log(data);
            if(!wasLoaded)
              store.dispatch(updateCurrentNodeIndex(data.root));
        });

  }
  getNodeComponent = () => {
    var {isLoaded , isLoggedIn} = this.state ;
    if(isLoggedIn){
      if(!isLoaded){
        this.loadData();
      }
      return (<div>
                    <button className="btn btn-primary m-2" onClick = {this.openParentNode}>{"<< parent "}</button>
                    <div>
                      <Node openNode = {this.openNode} delete = {this.delete}/>
                    </div>
                    <button className="btn btn-primary m-2" onClick = {this.toggleAddNodeOn}>Add New Node</button>
                    {this.getAddNodeComponent()}
                  </div>
                )
    }
    else{
        return <h3>Not Logged In</h3>;
    }
  }
  delete = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'token_id': store.getState().isLogged.tokenId },
        body: JSON.stringify({"id" : store.getState().currentNode.index, "emailId": store.getState().isLogged.emailId})
    };
    fetch('http://heroku-root.herokuapp.com/node/delete', requestOptions)
        .then(response => {console.log(response);this.loadData();});
    const index = this.getIndex(store.getState().currentNode.index,store.getState().nodes.nodes);
      if(index === -1)
        return null;
      const node = store.getState().nodes.nodes[index];
      if(node==null)
        return null;
    store.dispatch(updateCurrentNodeIndex(node.parent));
    }
  render(){
    console.log(this.state);
    var {isLoaded,isLoggedIn} = this.state;
    console.log(store.getState());
      return (
        <div className="App" style = {{margin:'5%'}}>
          <GoogleBtn  />
          {this.getNodeComponent()}
          <h3>{store.getState().isLogged.isLoggedIn ? "true": "false"}</h3>
          <button onClick = {this.loadData}>Load</button>
        </div>
      );
    }
}

export default App;
