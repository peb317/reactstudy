import React, { Component } from 'react';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CustomerAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      created_uid: '',
      updated_uid: '',
      subject: '',
      content: '',
      description: '',
      share_type: '',
      fileName: '',
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      file: null,
      created_uid: '',
      updated_uid: '',
      subject: '',
      content: '',
      description: '',
      share_type: '',
      fileName: '',
      open: false,
    });
  }

  handleFromSubmit = (e) => {
    e.preventDefault()
    this.addCustomer();
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer = () => {
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('subject', this.state.subject);
    formData.append('content', this.state.content);
    formData.append('description', this.state.description);
    formData.append('share_type', this.state.share_type);
    formData.append('created_uid', this.state.created_uid);
    formData.append('updated_uid', this.state.updated_uid);
    const config = {
      headers: {
        'constent-type': 'multipart/from-data'
      }
    }

    console.log("formData > ", formData);

    Axios({
      url: "http://localhost:8000/api/post/write",
      method: "post",
      header: config.headers,
      data: formData,
    }).then( ({ data:cData }) => {
      console.log(cData);
      /* this.setState({
        file: null,
        created_uid: '',
        updated_uid: '',
        subject: '',
        content: '',
        description: '',
        share_type: '',
        fileName: '',
      }); */
      this.props.stateRefresh();
    }).catch( error => {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객추가</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleFromSubmit}>
              <input accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span" name="upload_field">
                  { this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                </Button>
              </label><br />
              <TextField label="아이디" type="text" name="created_uid" value={this.state.created_uid} onChange={this.handleValueChange} /><br />
              <TextField label="수정자" type="text" name="updated_uid" value={this.state.updated_uid} onChange={this.handleValueChange} /><br />
              <TextField label="제목" type="text" name="subject" value={this.state.subject} onChange={this.handleValueChange} /><br />
              <TextField label="내용" type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br />
              <TextField label="설명" type="text" name="description" value={this.state.description} onChange={this.handleValueChange} /><br />
              <TextField label="공유타입" type="text" name="share_type" value={this.state.share_type} onChange={this.handleValueChange} /><br />
              <button type="submit">추가하기</button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFromSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CustomerAdd