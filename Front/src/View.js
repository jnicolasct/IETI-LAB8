import React from 'react';
import {Task} from './Task';
import axios from 'axios';
import moment from "moment";


export class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items:[]};
    }


    render() {
        axios.get('http://localhost:8080/task/list', 
        {headers:{"Content-ype":"application/json"}})
        .then(response => {
            console.log(response);
            let todoList = [];
            response.data.forEach(function (task) {
                todoList.push({
                   "description": task.description, "dueDate": task.dueDate, "status": task.status, "nombre": task.responsible.name, "email": task.responsible.email
                })

            });
            this.setState({items:todoList});
        })
            .catch(error => {
                console.log(error);
            });
        const todoList = this.state.items.map((todo, i) => {
            return (
                <Task key={i} description={todo.description} RName={todo.nombre} REmail={todo.email} status={todo.status} dueDate={moment(todo.dueDate)}/>
            );
        });

        return (
            <div>
                {todoList}
            </div>
        );


    }

}