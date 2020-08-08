import React, { Component } from 'react';
import Axios from 'axios';

class CustomerDel extends Component {

    delCustomer(id) {
        Axios({
            url: "http://localhost:8000/api/post/delete",
            method: "post",
            data: {id: id},
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
            <button onClick={e=>{this.delCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDel