import { Avatar, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCar } from "../../../actions/cars.action";
import { getSelfInvoices } from "../../../actions/invoices.action";
import * as actions from "../../../actions/user.action";
import "./IssueInvoicesContent.scss";
import apiService from "../../../services/api.service";
import { Autocomplete } from "@material-ui/lab";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'totalPrice', label: 'Tổng Tiền', minWidth: 10, format: (value) => value.toLocaleString('vi-VN') + "đ", },
    { id: 'isPaid', label: 'Thanh Toán', minWidth: 10 },
  ];
  
const IssueInvoicesContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);
  const [data,setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [beginDate, setBeginDate] = useState(Date.now()-(72000000*7))
  const [endDate, setEndDate] = useState(Date.now());
  const [status, setStatus] = useState({name: "",value: null});

  const statusType = [{name: "Chưa Thanh Toán",value:"false"}, {name: "Đã Thanh Toán",value: "true"}];

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
      setStatus({name: "Chưa Thanh Toán",value: "false"});

      const param = {
        isPaid: false
      }

      apiService
      .issues()
      .getSelfIssueInvoices(param)
      .then((response) => {
          setData(response.data.data)
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
    }else {
      navigate("/login")
    }
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleBeginDateChange = (date) => {
    setBeginDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  

  const onSearch = (value) => {
      setStatus(value);
      var isPaid = null;
      if (value!=null) {
        isPaid = value.value
      }
      const param = {
        isPaid: isPaid
      }
      apiService
      .issues()
      .getSelfIssueInvoices(param)
      .then((response) => {
          setData(response.data.data)
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
  }

  return (
    <div id="invoicesContent">
      {userProfile && data &&(
        <Paper>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          Danh Sách Hóa Đơn Phụ Thu
          </Typography>
          <Grid item xs={2}>
          <Autocomplete
            id="combo-box-status"
            value={status}
            onChange={(event, value) => {

              onSearch(value);
            }}
            options={statusType}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                className="text-field"
                margin="dense"
                label="Trạng thái"
              />
            )}
          />
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
         </Typography>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  onClick={(e) => navigate("/issues/"+row["id"])}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id == 'car') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img src={value.image} width="200"></img>
                          </TableCell>
                        );
                      }else 
                      if (column.id == 'isPaid' && value) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                             Đã thanh toán
                          </TableCell>
                        );
                      } else
                      if (column.id == 'isPaid' && !value) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                             Chưa thanh toán
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
          labelRowsPerPage="Hóa đơn mỗi trang"

        />
      </Paper>
      )}
    </div>
  );
};

export default IssueInvoicesContent;
