import React, { useState } from "react";

import "./SearchContent.scss";
import {
  TextField,
 
} from "@material-ui/core";
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import * as actions from "../../../actions/cars.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newSelect } from "../../../actions/invoices.action";
import { Alert } from "@material-ui/lab";
import { onLoadingTrue } from "../../../actions/user.action";



const SearchContent = () => {

  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.cars.error);

 

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
      page: 1,
      size: 100,
    }
    dispatch(newSelect(param))
    dispatch(onLoadingTrue())
    dispatch(actions.getCars(param,navigate))
  }


  return (
    <div id="searchContent">
    
      <h2>THỜI GIAN</h2>
      <div className="input-container">

        <KeyboardDateTimePicker
          id="date-picker-dialog"
          label="Bắt đầu"
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
          label="Kết Thúc"
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

      </div>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default SearchContent;
