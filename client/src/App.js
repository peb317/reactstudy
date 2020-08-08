import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
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

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      complated: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      complated: 0
    });
    Axios({
      url: "http://localhost:8000/api/post",
      method: "post"
    }).then( ({ data:cData }) => {
      console.log("post Data > ", cData);
      this.setState({customers:cData});
    }).catch( error => {
      console.log(error);
    });
  }  

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    Axios({
      url: "http://localhost:8000/api/post",
      method: "post"
    }).then( ({ data:cData }) => {
      console.log("post Data > ", cData);
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
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>사진</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>내용</TableCell>
                <TableCell>설명</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.customers ? this.state.customers.map((c, i) => { 
                return (<Customer id={c.id} img="https://placeimg.com/64/64/any" imgPath={c.imgPath} subject={c.subject} content={c.content} description={c.description} created_uid={c.created_uid} key={i} stateRefresh={this.stateRefresh} />) 
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
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
