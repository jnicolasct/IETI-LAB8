import React, {Component} from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {name:localStorage.getItem("nombre"), email:localStorage.getItem("user"), password: localStorage.getItem("password"), cpassword: localStorage.getItem("password")};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {

        return (
            <div className="TodoApp">
                <header>
                </header>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <AccountCircleIcon color = "primary" style={{ fontSize: 80 }}/>
                    <h3>Update User</h3>
                    <h4>Just change the data you want to update</h4>
                    <TextField
                        required
                        id="Name"
                        label="Name"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                    />

                    <br/>
                    <br/>

                    <TextField
                        id="Email"
                        label="Email"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            readOnly: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        value={this.state.email}
                    />

                    <br/>
                    <br/>
                    <TextField
                        required
                        id="Password"
                        label="Password"
                        type="password"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                    />

                    <br/>
                    <br/>
                    <TextField
                    required
                    id="CPasword"
                    label="Confirm Password"
                    type="password"
                    color="primary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleCPasswordChange}
                    value={this.state.cpassword}
                    />

                    <br/>
                    <br/>
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="submit"
                        >
                        Save 
                    </Button>
                    <br/>
                    <br/>
                </form>
            </div>
        );
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleCPasswordChange(e) {
        this.setState({
            cpassword: e.target.value
        });
    }

    
    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.name.length || !this.state.password.length || !this.state.cpassword.length)

            return;

        if (this.state.password == this.state.cpassword){
            localStorage.setItem('nombre', this.state.name);
            localStorage.setItem('password', this.state.password);
            this.props.UpdatingHandler(e);
        }
        else{
            alert("Las contraseñas no son iguales")
            this.setState({password:'', cpassword:''});
        }
    }

}

export default UserProfile;