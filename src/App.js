import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from "./pages/Login";
import Base from "./pages/Base";
import Register from "./pages/Register";
import Landing from "./pages/Landing"
import center from "./pages/center"
import FileList from "./pages/FileList"
import './App.css';


export default class App extends Component {

    handleModifyLocalStorage = (event) => {
        localStorage.setItem(event.key, event.oldValue);
    };

    componentDidMount() {
        window.addEventListener('storage', this.handleModifyLocalStorage);
    };

    componentWillUnmount() {
        window.removeEventListener('storage', this.handleModifyLocalStorage);
    };

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/landing" component={Landing}/>
                <Route path="/center" component={center}/>
                <Route path="/FileList" component={FileList}/>
                <Redirect from="/" to="/landing"/>
            </Switch>
        );
    }
}
