import React, { Component } from 'react';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import './App.css';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2),
  },
})

class App extends Component {

  state = {
    customers: "",
    complated: 0,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    Axios({
      url: "http://localhost:5000/api/customers",
      method: "get"
    }).then( ({ data:cData }) => {
      console.log('test > ', cData);
        this.setState({customers:cData});
    }).catch( error => {
        console.log(error);
    });
  }

  progress = () => {
    const { complated } = this.state;
    this.setState({ complated: complated >= 100 ? 0 : complated + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>사진</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.customers ? this.state.customers.map((c, i) => { 
              return (<Customer id={c.id} img={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} key={i} />) 
            }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} value={this.state.complated} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
