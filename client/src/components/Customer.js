import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>
                    { this.props.imgPath != null ? (
                        <img src={this.props.imgPath} />
                    ) : (
                        <img src={this.props.img} />
                    )}
                </TableCell>
                <TableCell>{this.props.subject}</TableCell>
                <TableCell>{this.props.content}</TableCell>
                <TableCell>{this.props.description}</TableCell>
                <TableCell>{this.props.created_uid}</TableCell>
            </TableRow>
        )
    };
}

export default Customer;
