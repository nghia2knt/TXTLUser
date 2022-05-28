import React, { Fragment, useEffect, useState } from "react";

import "./InvoiceInfoContent.scss";
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


const InvoiceInfoContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [invoice,setInvoice] = useState('');
  const error = useSelector((state) => state.invoices.error);
  const param = useParams()
  



  useEffect(() => {

    apiService
    .invoices()
    .getSelfInvoiceId(param.id)
    .then((response) => {
        setInvoice(response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)

    })
   
  }, [])
 
  
  return (
    <div id="invoiceInfoContent">
    
      {invoice && (
          <div className="input-container">
          <Fragment>
                  <Typography variant="h6" textAlign="center">THÔNG TIN HÓA ĐƠN</Typography>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                      
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                      </Typography>
                          <div>
                              <Typography gutterBottom>Mã hóa đơn: {invoice.id}</Typography>
                              <Typography gutterBottom>Ngày tạo: {invoice.createAt}</Typography>
                              <Typography gutterBottom>Trạng thái : {invoice.statusType}</Typography>
                          </div>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          THÔNG TIN KHÁCH HÀNG
                      </Typography>
                          <div>
                              <Typography gutterBottom>Tên khách hàng: {invoice.customerName}</Typography>
                              <Typography gutterBottom>Số điện thoại: {invoice.customerPhone}</Typography>
                              <Typography gutterBottom>Email : {invoice.customerEmail}</Typography>
                              <Typography gutterBottom>CMND: {invoice.customerIDCard}</Typography>  
                          </div>
                      </Grid>
                  </Grid>
                  <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          THÔNG TIN THUÊ XE
                  </Typography>
                  <img src={invoice.car.image}/>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                      
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <List disablePadding>
                          <ListItem sx={{ py: 1, px: 0 }}>
                              <ListItemText primary="Tên xe:" />
                              
                              <a href={"/Cars/"+invoice.car.id}>{invoice.carName}</a>
                          </ListItem>
                          <ListItem sx={{ py: 1, px: 0 }}>
                              <ListItemText primary="Thời gian bắt đầu:" />
                              <Typography  sx={{ fontWeight: 1000}}>
                                  {invoice.startTime}
                              </Typography>
                          
                          </ListItem>
                          <ListItem sx={{ py: 1, px: 0 }}>
                              <ListItemText primary="Thời gian kết thúc:" />
                              <Typography  sx={{ fontWeight: 1000}}>
                                  {invoice.endTime}
                              </Typography>
                          </ListItem>
                      </List>
                      </Grid>
                      <List disablePadding>
                          <ListItem sx={{ py: 1, px: 0 }}>
                              <ListItemText primary="Tổng Tiền:" />
                              
                              <Typography  variant="h5" color="secondary" gutterBottom>
                                      <CurrencyFormat
                                      value={invoice.totalPrice}
                                      displayType={'text'} thousandSeparator={true} suffix="đ"
                                      />
                              </Typography>
                          </ListItem>
                         
                         
                      </List>
                      <Grid item xs={12} sm={3}>
                     
                      </Grid>
                  </Grid>
                 
                  
          </Fragment>
          </div>
      )}
      
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default InvoiceInfoContent;
