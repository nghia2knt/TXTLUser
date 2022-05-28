import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../../actions/cars.action";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import "./ListContent.scss";
import { newSelect } from "../../../actions/invoices.action";
import { onLoadingTrue } from "../../../actions/user.action";
const columns = [
  { id: 'name', label: 'Tên', minWidth: 10 },
  { id: 'brand', label: 'Hãng xe', minWidth: 10 },
  { id: 'model', label: 'Mẫu', minWidth: 10 },
  { id: 'licensePlate', label: 'Biển số', minWidth: 10 },
  { id: 'transmission', label: 'Hộp số', minWidth: 10 },
  { id: 'engineType', label: 'Nhiên liệu', minWidth: 10 },
  { id: 'seats', label: 'Số ghế', minWidth: 10 },
  { id: 'image', label: 'Hình ảnh', minWidth: 10 },
  { id: 'price', label: 'Giá tiền', minWidth: 10, format: (value) => value.toLocaleString('vi-VN') + "đ",},
  { id: 'id', label: '', minWidth: 10 },


];

const ListContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.cars.listSearchCars);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onSelect = (id) => {
    dispatch(onLoadingTrue())
    dispatch(actions.getCar(id,navigate))
  }

  const onViewDetail = (id) => {
    navigate("/cars/"+id)
  }

  return (
    <Paper>
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if (column.id == 'brand') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value.name) : value.name}
                      </TableCell>
                    );
                  }else if (column.id == 'image') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <img src={value} width="200"></img>
                      </TableCell>
                    );
                  }
                  else if (column.id == 'id') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                                <Button variant="contained" color="primary" onClick={(e) => onViewDetail(value)}>Xem Chi Tiết</Button>                      

                                <Button variant="contained" color="secondary" onClick={(e) => onSelect(value)}>THUÊ NGAY</Button>                      
                      </TableCell>
                    );
                  }
                  else{
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  );
};

export default ListContent;
