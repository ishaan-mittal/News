import logo from './logo.svg';
import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsItem from './components/NewsItem';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

export class App extends Component {

  apikey=process.env.REACR_API_KEY;

  state={
    progress1:0
  }
  setProgress=(progress)=>{
     this.setState({
      progress1:progress
     })
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar></Navbar>

        <LoadingBar
        color='#f11946'
        progress={this.state.progress1}
       
      />
       
        <Switch>
          <Route exact  path="/"><News setprogress={this.setProgress} key="general"  apikey={this.apikey} pageSize={5} country="in" category="general"/></Route>
          <Route exact  path="/business"><News setprogress={this.setProgress} key="business"pageSize={5}apikey={this.apikey} country="in" category="business"/></Route>
          <Route exact  path="/entertainment"><News setprogress={this.setProgress} key="entertainment" pageSize={5}apikey={this.apikey} country="in" category="entertainment"/></Route>
          <Route exact  path="/health"><News setprogress={this.setProgress} key="health"pageSize={5} apikey={this.apikey} country="in" category="health"/></Route>
          <Route exact  path="/science"><News setprogress={this.setProgress} key="general" pageSize={5}apikey={this.apikey} country="in" category="science"/></Route>
          <Route exact  path="/sports"><News setprogress={this.setProgress} key="science"pageSize={5}apikey={this.apikey} country="in" category="sports"/></Route>
          <Route exact  path="/technology"><News setprogress={this.setProgress}  key="technology"pageSize={5}apikey={this.apikey} country="in" category="technology"/></Route>
         
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App

