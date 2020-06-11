import React, {Component} from 'react';
import Node from './components/node';
import AddNewNode from './components/AddNodeForm';
import GoogleBtn from './components/googleBtn'
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {useSelector} from 'react-redux';
import {store,persistor} from './store'
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
      addNodeOn: false,
      isLoggedIn: store.getState().isLogged.isLoggedIn,
      store: store
    }
  }

  fun = store.subscribe(()=>{
    console.log("subscribing");
    this.setState({
      isLoggedIn: store.getState().isLogged.isLoggedIn
    });
  });
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
  getLoginButton = () =>{
    const responseGoogle = (response) => {
      var {googleId} = {response};
      this.setState({
        isLoggedIn:true
      });
      console.log(response.getBasicProfile().getEmail());
    }
    const logout = (response) => {
      console.log(response);
    }
    if(this.state.isLoggedIn === false){
      return (<GoogleLogin
          clientId="1084512785168-9no6rgfvkralio08vd4k36fvc5c0gnsp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />);
    }
    else{
      return (<GoogleLogout
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>);
    }
  }
  render(){
    var {currentNode,isLoaded,isLoggedIn} = this.state;
    console.log(isLoggedIn);
    console.log(this.state.store.getState())
    if(isLoaded){
      return (
        <div className="App" style = {{margin:'5%'}}>
          <GoogleBtn store = {this.state.store} />
          {isLoggedIn && (<div>
            <button className="btn btn-primary m-2" onClick = {this.openParentNode}>{"<< parent "}</button>
            <div>
              <Node node = {currentNode} childNodes = {this.state.childNodes} openNode = {this.openNode} addNewNode = {this.addNewNode}/>
            </div>
            <button className="btn btn-primary m-2" onClick = {this.toggleAddNodeOn}>Add New Node</button>
            {this.getAddNodeComponent()}
          </div>)}
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
