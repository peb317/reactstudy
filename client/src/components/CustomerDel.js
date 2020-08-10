import React, { Component } from 'react';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

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
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={e => {this.delCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDel