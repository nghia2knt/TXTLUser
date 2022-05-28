import React, { useEffect, useState } from "react";

import "./CarInfoContent.scss";
import {
    Card,
    CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Button,Typography } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createInvoice, newSelect } from "../../../actions/invoices.action";
import Moment from "react-moment";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import CurrencyFormat from "react-currency-format";
import { Alert } from "@material-ui/lab";
import apiService from "../../../services/api.service";
import { getCar } from "../../../actions/cars.action";

const columns = [
    { id: 'user', label: 'Người dùng', minWidth: 30 },
    { id: 'createAt', label: 'Thời gian', minWidth: 30 },
    { id: 'point', label: 'Điểm', minWidth: 30 },
    { id: 'content', label: 'Nội dung', minWidth: 30 },
  ];

const CarInfoContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [carInfo,setCarInfo] = useState('');
  const [voteContent,setVoteContent] = useState('');
  const [votePoint,setVotePoint] = useState('');
  const [votes, setVotes] = useState([])
  const error = useSelector((state) => state.invoices.error);
  const param = useParams()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const time = useSelector((state) => state.invoices.time);
  const duration = useSelector((state) => state.invoices.duration);
  const userProfile = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
        dispatch(actions.getUserByJWT())
    }
    apiService
    .cars()
    .getVote(param.id)
    .then((response) => {
        setVotes(response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)

    })
    apiService
    .cars()
    .getCar(param.id)
    .then((response) => {
       setCarInfo(response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)

    })

  }, [])
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBeginDateChange = (date) => {
    time.fromDate = date
   dispatch(newSelect(time))
  };

  const handleEndDateChange = (date) => {
    time.toDate = date
    dispatch(newSelect(time))
  };
  const onSelect = (id) => {
    dispatch(actions.onLoadingTrue())
    dispatch(getCar(id,navigate))
  }
  const onSendVote = () =>{
    const requestBody = {
        point: votePoint,
        content: voteContent
    }
    setVotePoint('')
    setVoteContent('')
    apiService
    .cars()
    .createVote(carInfo.id,requestBody)
    .then((response) => {
        apiService
        .cars()
        .getVote(param.id)
        .then((response) => {
            setVotes(response.data.data)
        })
        .catch((error) => {
             alert(error.response.data.message)
        })
    })
    .catch((error) => {
        alert(error.response.data.message)
    })
  }
  return (
    <div id="carInfoContent">
    
      {carInfo && (
          <div className="input-container">
                <Typography variant="h6" gutterBottom>
        THÔNG TIN XE
      </Typography>
            <img src={carInfo.image}></img>
            <TextField id="name" label="Tên" className="text-field" fullWidth value={carInfo.name}/>
             <TextField id="model" label="Mẫu xe" className="text-field" fullWidth value={carInfo.model}/>
             <TextField id="licensePlate" label="Biển số" className="text-field" fullWidth value={carInfo.licensePlate}/>
             <TextField id="seats" label="Số ghế" className="text-field" fullWidth value={carInfo.seats} />
             <TextField id="price" label="Giá tiền (giờ)" className="text-field" fullWidth value={carInfo.price} />
             <TextField id="brand" label="Hãng xe" className="text-field" fullWidth value={carInfo.brand.name} />
             <TextField id="engineType" label="Nhiên liệu" className="text-field" fullWidth value={carInfo.engineType} />
             <TextField id="transmission" label="Hộp số" className="text-field" fullWidth value={carInfo.transmission} />
             
                
        </div>    
      )}
  
        <Paper style={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom>
       THỜI GIAN
      </Typography>
      
          <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Thời gian bắt đầu:" />
              <KeyboardDateTimePicker
                id="date-picker-dialog"
                label=""
                format="dd-MM-yyyy hh:mm"
                value={time.fromDate}
                onChange={handleBeginDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className="text-field"
                invalidDateMessage="Ngày sai định dạng"
                fullWidth
              />
          </ListItem>
       
       
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Thời gian kết thúc:" />
            <KeyboardDateTimePicker
              id="date-picker-dialog"
              label=""
              format="dd-MM-yyyy hh:mm"
              value={time.toDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className="text-field"
              invalidDateMessage="Ngày sai định dạng"
              fullWidth
            />
          </ListItem>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Chi phí
          </Typography>
          <Grid container>
              <React.Fragment key="Số giờ">
                    <Grid item xs={6}>
                      <Typography gutterBottom>Số giờ</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {duration > 0 && (
                        <Typography gutterBottom>{duration}</Typography>
                      )}
                      {duration <= 0 && (
                        <Typography gutterBottom>0</Typography>
                      )}
                      
                    </Grid>
              </React.Fragment>
              <React.Fragment key="Giá tiền/giờ: ">
                    <Grid item xs={6}>
                      <Typography gutterBottom>Giá tiền/giờ</Typography>
                    </Grid>
                    {carInfo && (
                          <Grid item xs={6}>
                          <CurrencyFormat
                              value={carInfo.price}
                              displayType={'text'} thousandSeparator={true} suffix="đ"
                          />
                        </Grid>
                    )}
                   
              </React.Fragment>
              <React.Fragment key="Tổng tiền: ">
                    <Grid item xs={6}>
                      <Typography variant="h5"   gutterBottom>Tổng tiền</Typography>
                    </Grid>
                    {carInfo && (
                           <Grid item xs={6}>
                            <Typography  variant="h5" color="secondary" gutterBottom>
                              {(carInfo.price*duration) > 0 && (
                                    <CurrencyFormat
                                    value={(carInfo.price*duration)}
                                    displayType={'text'} thousandSeparator={true} suffix="đ"
                                    />
                              )}
                           
                            </Typography>
                         </Grid>
                    )}

              </React.Fragment>

          </Grid>
        <Typography variant="h6" gutterBottom>
        <Button variant="contained" color="secondary" onClick={(e) => onSelect(carInfo.id)}>Thuê Ngay</Button> 
        </Typography>
       
        <Typography variant="h6" gutterBottom>
        LƯỢT ĐÁNH GIÁ: {votes.length}
      </Typography>
            <TableContainer style={{ height: 400, width: '100%' }}>
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
                {votes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'user') {
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value.name) : value.name}
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
            count={votes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {
                userProfile && (
            <div>
            <Typography variant="h6" gutterBottom>
            <TextField id="outlined-basic" label="Nội Dung" variant="outlined" value={voteContent} onChange={(e) => setVoteContent(e.target.value)} />
            </Typography>
            <Typography variant="h6" gutterBottom>
            <TextField id="outlined-basic" label="Điểm (1 - 10)" variant="outlined" value={votePoint}  onChange={(e) => setVotePoint(e.target.value)} />
            </Typography>
            <Typography variant="h6" gutterBottom>
             <Button variant="contained" color="primary" onClick={(e) => onSendVote()} >Gửi đánh giá</Button> 
            </Typography>
            </div>
                )
            }
            

        </Paper>
      
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default CarInfoContent;
