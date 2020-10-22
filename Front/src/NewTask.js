import React, {Component} from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';

export class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], description: '',responsible: {name:'', email:''}, status: '', dueDate: new Date()};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleRNameChange = this.handleRNameChange.bind(this);
        this.handleREmailChange = this.handleREmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAll = this.handleSubmitAll.bind(this);
    }


    render() {

        return (
            <div className="TodoApp">
                <header>
                </header>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <h3>New Task</h3>
                    <TextField
                        required
                        id="description"
                        label="description"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}
                    />

                    <br/>
                    <br/>

                    <TextField
                        required
                        id="RName"
                        label="Resposible Name"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleRNameChange}
                        value={this.state.responsible.name}
                    />

                    <br/>
                    <br/>
                    <TextField
                        required
                        id="REmail"
                        label="Responsible email"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleREmailChange}
                        value={this.state.responsible.email}
                    />

                    <br/>
                    <br/>
                    <TextField
                    required
                    id="status"
                    label="status"
                    color="primary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                    />

                    <br/>
                    <br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="dense"
                            id="due-date"
                            label="Due Date"
                            format="dd/MM/yyyy"
                            value={this.state.dueDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <br/>
                    <br/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="submit"
                        >
                        Finalizar
                    </Button>
                </form>
            </div>
        );
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }
    handleRNameChange(e) {
        this.setState({
            responsible: {name : e.target.value, email: this.state.responsible.email}
        });
    }
    handleREmailChange(e) {
        this.setState({
            responsible:{name: this.state.responsible.name, email: e.target.value}
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    
    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.description.length || !this.state.responsible.name.length || !this.state.responsible.email.length || !this.state.status.length || !this.state.dueDate)

            return;

        const newItem = {
            description: this.state.description,
            responsible: {
            name: this.state.responsible.name,
            email: this.state.responsible.email},
            status: this.state.status,
            dueDate:moment(this.state.dueDate.toDateString())

        };
        
        axios.post('http://localhost:8080/task/add', {
            description: this.state.description,
            responsible: {
            name: this.state.responsible.name,
            email: this.state.responsible.email},
            status: this.state.status,
            dueDate:moment(this.state.dueDate.toDateString())
        }, {headers:{"Content-ype":"application/json"}})
            .then(response => {
                console.log(response);                                   
            })
            .catch(error => {
                console.log(error);
            });
        

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            responsible: {
                name: '',
                email: ''},
            status: '',
            dueDate: new Date()
        }));

        this.props.newTaskHandler(this.state.items);
    }

    handleSubmitAll(e){
        this.props.newTaskHandler(this.state.items);
    }

}

export default NewTask;