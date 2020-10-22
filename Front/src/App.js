import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Login} from "./Login";
import MiniDrawerView from './Drawer'
import NewTask from './NewTask'
import UserProfile from './UserProfile'
import moment from "moment";

localStorage.setItem('user', "nicolas.ct@mail.com");
localStorage.setItem('nombre', "Nicolas Cortes")
localStorage.setItem('password', "contrasena");

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false, isInNewTask: false, isUpdating: false, isFilterOn: false, items: [], itemsFilter: []};
        this.clickHandler = this.clickHandler.bind(this);
        this.newTaskHandler = this.newTaskHandler.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);   
        this.UpdatingHandler = this.UpdatingHandler.bind(this);  
        this.StartUpdatingHandler = this.StartUpdatingHandler.bind(this);
        this.FilterHandler = this.FilterHandler.bind(this);   
        this.FilterHandlerClear = this.FilterHandlerClear.bind(this);   
    }

    


    render() {
        const LoginView = () => (
            <Login clickHandler={this.clickHandler}/>
        );
        const TodoAppView = () => (
            <MiniDrawerView todoList={this.state.items} buttonHandler= {this.buttonHandler} StartUpdatingHandler= {this.StartUpdatingHandler} FilterHandler= {this.FilterHandler} FilterHandlerClear= {this.FilterHandlerClear}/>
        );
        const TodoAppFilterView = () => (
            <MiniDrawerView todoList={this.state.itemsFilter} buttonHandler= {this.buttonHandler} StartUpdatingHandler= {this.StartUpdatingHandler} FilterHandler= {this.FilterHandler} FilterHandlerClear= {this.FilterHandlerClear}/>
        );
        const TodoNewTask = () => (
            <NewTask newTaskHandler={this.newTaskHandler}/>
        );
        const TodoUpdating = () => (
            <UserProfile UpdatingHandler={this.UpdatingHandler}/>
        );

        var ruta = LoginView;
            
        if (!this.state.isLoggedIn){
            ruta = LoginView
        }
        else if (this.state.isInNewTask){
            ruta = TodoNewTask
        }
        else if (this.state.isUpdating){
            ruta = TodoUpdating
        }
        else if (this.state.isFilterOn){
            ruta = TodoAppFilterView
        }
        else{
            ruta = TodoAppView
        }




            return (
                <Router>
                    <div className="App">
                        <div>
                            <Switch>
                                <Route exact path="/" component={ruta}/>
                                <Route exact path="/Login" component={LoginView}/>
                                <Route exact path="/Todo" component={TodoAppView}/>
                                <Route exact path="/NewTask" component={TodoNewTask}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            );
        }

        clickHandler (e) {
        this.setState({isLoggedIn:true}) ;
        
        }

        newTaskHandler(e){
            var lista = this.state.items.slice();
            lista = lista.concat(e);
            this.setState({isInNewTask:false, items:lista});      
        }

        buttonHandler(e){
            this.setState({isInNewTask:true, isFilterOn:false});
        }

        StartUpdatingHandler(e){
            this.setState({ isUpdating:true, isFilterOn:false});
        }

        UpdatingHandler(e){
            this.setState({isLoggedIn:false, isUpdating:false, isFilterOn:false});
        }

        FilterHandler(e){
            var lista = [];
            var flag = false
            const pr = moment((new Date()).toDateString());
            if(moment(e.FdueDate).isAfter(pr)){
                flag = true;
            }
            for (var i = 0; i < this.state.items.length; i++) {
                if(flag){
                    if(this.state.items[i].description.includes(e.Fdescription) && this.state.items[i].responsible.name.includes(e.Fresponsible) && this.state.items[i].status.includes(e.Fstatus)){
                        lista.push(this.state.items[i]);
                    }
                }
                else {
                    if(this.state.items[i].description.includes(e.Fdescription) && this.state.items[i].responsible.name.includes(e.Fresponsible) && this.state.items[i].status.includes(e.Fstatus) && moment(e.FdueDate).isSame(this.state.items[i].dueDate)){
                        lista.push(this.state.items[i]);
                    }
                }
            }
            this.setState({ isFilterOn:true, itemsFilter:lista});
        }

        FilterHandlerClear(e){
            this.setState({ isFilterOn:false, itemsFilter:[]});
        }
    }

export default App;
