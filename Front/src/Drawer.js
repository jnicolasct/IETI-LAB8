import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {View} from './View';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from "moment";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawerView(props) {
        
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const nombre = localStorage.getItem('nombre');
  const email = localStorage.getItem('user');
  const [openD, setOpenD] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [responsible, setResponsible] = React.useState('');
  const [status, setStatus] = React.useState('');
  const today = new Date();
  const future = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay());
  const [dueDate, setDueDate] = React.useState(future);

  const handleClickOpen = () => {
    setOpenD(true);
  };

  const handleClose = () => {
    setOpenD(false);
  };

  const handleCloseAndClear = () => {
    props.FilterHandlerClear();
    setOpenD(false);
  };

  const handleCloseAndSubmit = () => {
    const filter = {Fdescription:description, Fresponsible:responsible, Fstatus:status, FdueDate:moment(dueDate.toDateString())};
    props.FilterHandler(filter);
    setOpenD(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const buttonHandler = (e) => {
    props.buttonHandler(e);

  };

  const handleUpdate = (e) => {
    props.StartUpdatingHandler(e);

  };

  const handleDescriptionChange= (e) => {
    setDescription(e.target.value);

  };

  const handleRNameChange = (e) => {
    setResponsible(e.target.value);

  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);

  };

  const handleDateChange = (date) => {
    setDueDate(date);

  };

  
  
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            All Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={handleUpdate}>
              <ListItemIcon><AccountCircleIcon/></ListItemIcon>
              <ListItemText primary= {nombre} secondary= {email}/>
            </ListItem>

        </List>
        <Divider />
        <List>
            <ListItem button onClick={handleClickOpen}>
              <ListItemIcon><FilterListIcon/></ListItemIcon>
              <ListItemText primary="Add Filter"/>
            </ListItem>

        </List>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary="Log Out"/>
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <View todoList={props.todoList}/>
            <IconButton onClick={buttonHandler}><AddCircleIcon color = "primary" fontSize = "large"/></IconButton>
            <div>
              <Dialog open={openD} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add search filters for your tasks
                  </DialogContentText>
                  <DialogContentText>
                    If you are going to filter by date remember to change the year, as it is one year ahead.
                  </DialogContentText>
                  <TextField
                        id="description"
                        label="description"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={handleDescriptionChange}
                        value={description}
                    />

                    <br/>
                    <br/>

                    <TextField
                        id="Name"
                        label="Resposible Name"
                        color="primary"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        variant="outlined"
                        onChange={handleRNameChange}
                        value={responsible}
                    />
                    <br/>
                    <br/>
                    <TextField
                      id="status"
                      label="status"
                      color="primary"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      margin="dense"
                      variant="outlined"
                      onChange={handleStatusChange}
                      value={status}
                    />

                    <br/>
                    <br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            helperText={''}
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="dense"
                            id="due-date"
                            label="Due Date"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            value={dueDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAndSubmit} color="primary">
                      Apply
                  </Button>
                  <Button onClick={handleCloseAndClear} color="primary">
                    Clear All
                  </Button>
                </DialogActions>
              </Dialog>
            </div> 
      </main>
    </div>
  );
}


