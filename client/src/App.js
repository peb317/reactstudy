import React from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const customer = [{
  id: 1,
  image: "https://placeimg.com/64/64/any",
  name: "백인천1",
  birthday: "05.13",
  gender: "남자",
  job: "무직",
},{
  id: 2,
  image: "https://placeimg.com/64/64/any",
  name: "백인천2",
  birthday: "05.13",
  gender: "남자",
  job: "무직",
},{
  id: 3,
  image: "https://placeimg.com/64/64/any",
  name: "백인천3",
  birthday: "05.13",
  gender: "남자",
  job: "무직",
}]

const styles = theme => ({
  width: '100%',
  height: '100vh',
})

function App() {
  return (
    <Paper>
      <Table>
        <TableHead fullWidth>
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
          { customer.map((c, i) => { return ( <Customer id={c.id} img={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} key={i} /> ) }) } 
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </Paper>
  );
}

export default App;
