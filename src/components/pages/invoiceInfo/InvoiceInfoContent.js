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

const countPoint = (list) => {
    var point = 0
    console.log(list.toString())
    if (list!=null) {
      list.map((element) => {
        console.log("log nè")
        point = point + element.point
      })
      point = point / list.length
    }
    console.log(point)
    return point
}  
const InvoiceInfoContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [voteContent,setVoteContent] = useState('');
  const [votePoint,setVotePoint] = useState(10);
  const [invoice,setInvoice] = useState('');
  const [totalPoint,setTotalPoint] = useState(10);
  const [votes, setVotes] = useState([])
  const error = useSelector((state) => state.invoices.error);
  const param = useParams()
  const mapValue = {
    "WAIT":"Đang chờ xác nhận",
    "CONFIRMED":"Đã được xác nhận",
    "LATE":"Chậm trả xe",
    "REQ_REFUND":"Yêu cầu hoàn tiền",
    "REFUNDED":"Đã hoàn tiền",
    "DONE":"Thuê hoàn tất",
    "CANCEL":""
  }



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
 
  const onPrint = () => {
  const requestBody ={
      "company": "Công ty TXTL IUH",
      "email": "lactuy47@gmail.com",
      "invoice_no": invoice.id,
      "invoice_date": invoice.createAt,
      "invoice_due_date": invoice.createAt,
      "address": "12 Nguyen Van Bao, Go Vap",
      "company_bill_to": "",
      "website": "https://iuh.edu.vn",
      "document_id": invoice.id,
      "customer_name":invoice.customerName,
      "customer_email":invoice.customerEmail,
      "customer_address":invoice.customerAddress,
      "items": [
        {
          "name": invoice.car.name,
          "date": invoice.startTime + " -> " + invoice.endTime + "",
          "price": invoice.car.price,
          "total_price": invoice.totalPrice
        }
         
      ]
    }
    apiService
    .template()
    .createPDF(requestBody)
    .then((response) => {
        const pdfWindow = window.open();
          pdfWindow.location.href = response.data.download_url;
    })
    .catch((error) => {
        alert(error.response.message)

    })
 
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
    .createVote(invoice.car.id,requestBody)
    .then((response) => {
        navigate("/cars/"+response.data.data.car.id)
    })
    .catch((error) => {
        alert(error.response.data.message)
    })
  }
const onRequestRE = (id) => {
    dispatch(actions.onLoadingTrue())

    const requestBody ={
        status: "REQ_REFUND"
    }
    apiService
    .invoices()
    .updateStatus(id,requestBody)
    .then((response) => {
        window.location.href = "/invoices/"+param.id;
    })
    .catch((error) => {
        alert(error.response.message)

    }).finally(
        dispatch(actions.onLoadingFalse())

    )
 
   
  }
  const onRE = (id) => {
    dispatch(actions.onLoadingTrue())
    const requestBody ={
        status: "REFUNDED"
    }
    apiService
    .invoices()
    .updateStatus(id,requestBody)
    .then((response) => {
        window.location.href = "/invoices/"+param.id;
    })
    .catch((error) => {
        alert(error.response.message)

    }).finally(
        dispatch(actions.onLoadingFalse())

    )
 
   
  }
  return (
    <div id="invoiceInfoContent">
    
      {invoice && (
          <div className="input-container">
          <Fragment>
                  <Typography variant="h6" textAlign="center">THÔNG TIN THUÊ XE</Typography>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                      
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                      </Typography>
                          <div>
                              <Typography gutterBottom>Mã hóa đơn: {invoice.id}</Typography>
                              <Typography gutterBottom>Ngày tạo: {invoice.createAt}</Typography>
                              <Typography gutterBottom>Trạng thái : {mapValue[invoice.statusType]}</Typography>
                              <Button variant="contained" color="primary" onClick={(e) =>onPrint()}>
                                       Xuất hóa đơn
                            </Button>
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
                          <ListItem sx={{ py: 1, px: 0 }}>
                            
                            
                            {
                                invoice.statusType == "CONFIRMED" && (
                                    <div>
                                <ListItemText primary="Cập nhật:" />
                                <Button variant="contained" color="primary" onClick={(e) =>onRequestRE(invoice.id)}>
                                        Yêu cầu hoàn tiền
                                </Button>
                                </div>
                                )
                            }
                            {
                                invoice.statusType == "REQ_REFUND" && (
                                    <div>
                                <ListItemText primary="Cập nhật trạng thái hoàn tiền:" />
                                <Button variant="contained" color="primary" onClick={(e) =>onRE(invoice.id)}>
                                        Xác nhận hoàn tất
                                </Button>
                                </div>
                                )
                            }
                           {
                                invoice.statusType == "DONE" && (
                                    <div>
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
                                </div>
                                )
                            }
                        
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
