import React, { Component } from 'react';
import Axios from 'axios';

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
    }
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
    return (
      <form onSubmit={this.handleFromSubmit}>
        <h1>고객추가</h1>
        프로필이미지 : <input type="file" name="upload_field" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
        아이디 : <input type="text" name="created_uid" value={this.state.created_uid} onChange={this.handleValueChange} /><br />
        수정자 : <input type="text" name="updated_uid" value={this.state.updated_uid} onChange={this.handleValueChange} /><br />
        제목 : <input type="text" name="subject" value={this.state.subject} onChange={this.handleValueChange} /><br />
        내용 : <input type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br />
        설명 : <input type="text" name="description" value={this.state.description} onChange={this.handleValueChange} /><br />
        공유타입 : <input type="text" name="share_type" value={this.state.share_type} onChange={this.handleValueChange} /><br />
        <button type="submit">추가하기</button>
      </form>
    )
  }
}

export default CustomerAdd