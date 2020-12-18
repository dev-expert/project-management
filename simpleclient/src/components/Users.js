import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from './Common';

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}