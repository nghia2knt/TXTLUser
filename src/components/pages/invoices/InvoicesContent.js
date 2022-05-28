import { Avatar, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCar } from "../../../actions/cars.action";
import { getSelfInvoices } from "../../../actions/invoices.action";
import * as actions from "../../../actions/user.action";
import "./InvoicesContent.scss";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'startTime', label: 'Bắt đầu', minWidth: 10 },
    { id: 'endTime', label: 'Kết thúc', minWidth: 10 },
    { id: 'carName', label: 'Tên xe', minWidth: 10 },
    { id: 'carLicensePlate', label: 'Biển số xe', minWidth: 10 },
    { id: 'car', label: 'Hình ảnh', minWidth: 10 },
    { id: 'totalPrice', label: 'Giá tiền', minWidth: 10, format: (value) => value.toLocaleString('vi-VN') + "đ",},
    { id: 'statusType', label: 'Trạng thái', minWidth: 10 },
  ];
  
const InvoicesContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);
  const data = useSelector((state) => state.invoices.selfInvoices);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [beginDate, setBeginDate] = useState(Date.now()-(72000000*7))
  const [endDate, setEndDate] = useState(Date.now());
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
      const param = {
        fromDate: beginDate,
        toDate: endDate,
      }
      dispatch(getSelfInvoices(param))
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

  const onSearch = () => {
    const param = {
      fromDate: beginDate,
      toDate: endDate,
    }
    dispatch(actions.onLoadingTrue())
    dispatch(getSelfInvoices(param))
  }

  return (
    <div id="invoicesContent">
      {userProfile && data &&(
        <Paper>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          Danh Sách Lịch Đặt Thuê Xe
          </Typography>
          <KeyboardDateTimePicker
          id="date-picker-dialog"
          label="Ngày Tạo Từ"
          format="dd-MM-yyyy hh:mm"
          value={beginDate}
          onChange={handleBeginDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ngày sai định dạng"
        />
        <KeyboardDateTimePicker
          id="date-picker-dialog"
          label="Ngày Tạo Đến"
          format="dd-MM-yyyy hh:mm"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ngày sai định dạng"
        />
        <Button variant="contained" onClick={onSearch}>Tìm kiếm</Button>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  onClick={(e) => navigate("/invoices/"+row["id"])}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id == 'car') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img src={value.image} width="200"></img>
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
      )}
    </div>
  );
};

export default InvoicesContent;
