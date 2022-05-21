import React, { useEffect, useState } from "react";

import "./CreateInvoiceContent.scss";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { Button,Typography } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createInvoice, newSelect } from "../../../actions/invoices.action";
import Moment from "react-moment";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import CurrencyFormat from "react-currency-format";
import { Alert } from "@material-ui/lab";


const CreateInvoiceContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.user.userProfile);
  const carInfo = useSelector((state) => state.cars.selectedCar);
  const time = useSelector((state) => state.invoices.time);
  const [totalPrice, setTotalPrice] = useState('')
  const [hourPrice, setHourPrice] = useState('')
  const duration = useSelector((state) => state.invoices.duration);
  const error = useSelector((state) => state.invoices.error);

  useEffect(() => {

    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }else {
      navigate("/login")
    }
  }, [])
  const handleBeginDateChange = (date) => {
    time.fromDate = date
   dispatch(newSelect(time))
  };

  const handleEndDateChange = (date) => {
    time.toDate = date
    dispatch(newSelect(time))
  };

  const onSend = () => {
    const info = {
      startTime: time.fromDate,
      endTime: time.toDate,
      carId: carInfo.id
    }
    dispatch(actions.onLoadingTrue())
    dispatch(createInvoice(info))
  }

  return (
    <div id="createInvoiceContent">
      <Typography variant="h6" gutterBottom>
        THÔNG TIN THUÊ XE
      </Typography>
      {carInfo && (
             <img src={carInfo.image}></img>    
      )}
      <List disablePadding>
      <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tên xe:" />
          {carInfo && (
              <Typography  sx={{ fontWeight: 1000}}>
              {carInfo.name}
              </Typography>
          )}
         
        </ListItem>
        {time && (
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
              />
          </ListItem>
        )}
        {time && (
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
            />
          </ListItem>
        )}
       
       
      </List>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Khách hàng
          </Typography>
          {userProfile && (
            <div>
                <Typography gutterBottom>{userProfile.name}</Typography>
                <Typography gutterBottom>{userProfile.phoneNumber}</Typography>
                <Typography gutterBottom>{userProfile.email}</Typography>
                <Typography gutterBottom>{userProfile.address}</Typography>
            </div>
            
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
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
          <Grid>
          <Button variant="contained" color="secondary" onClick={(e) => onSend()}>THUÊ NGAY</Button>                      

          </Grid>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default CreateInvoiceContent;
