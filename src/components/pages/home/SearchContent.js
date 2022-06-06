import React, { useEffect, useState } from "react";

import "./SearchContent.scss";
import {
  Grid,
  TextField,
 
} from "@material-ui/core";
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import * as actions from "../../../actions/cars.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newSelect } from "../../../actions/invoices.action";
import { Alert, Autocomplete } from "@material-ui/lab";
import { onLoadingTrue } from "../../../actions/user.action";
import apiService from "../../../services/api.service";



const SearchContent = () => {

  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [brand,setBrand] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.cars.error);
  const [engineTypeValue, setEngineTypeValue] = useState({name:"",value:""});
  const [transmissionValue, setTransmissionValue] = useState({name:"",value:""});
  const [brandValue, setBrandValue] = useState(null);
  const [nameValue, setNameValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [seatsValue, setSeatsValue] = useState(null);
  const listEngineType = [{name:"Xăng",value:"GAS"}, {name:"Điện",value:"ELECTRICITY"}];
  const listTransmissionType = [{name:"Thủ công",value:"MANUAL"}, {name:"Tự động",value:"AUTOMATIC"}];

  useEffect(() => {
    if (beginDate==null) {
      setBeginDate(Date.now()) 
    }
    if (endDate==null) {
      setEndDate(Date.now()+7200000) 
    }
    apiService
    .brands()
    .brandList()
    .then((response) => {
        setBrand(response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)

    })
  }, [])

  const handleBeginDateChange = (date) => {
    setBeginDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSearch = () => {
    var brandInput = null
    if (brandValue != null) {
      brandInput = brandValue.id
    }
    if (transmissionValue == null) {
      setTransmissionValue({name:"",value:""})
    }
    if (engineTypeValue == null) {
      setEngineTypeValue({name:"",value:""})
    }
    const param = {
      fromDate: beginDate,
      toDate: endDate,
      name: nameValue,
      page: 1,
      size: 100,
      model: modelValue,
      seats: seatsValue,
      brand:  brandInput,
      transmission: transmissionValue.value,
      engine: engineTypeValue.value,
    }
    dispatch(newSelect(param))
    dispatch(onLoadingTrue())
    dispatch(actions.getCars(param,navigate))
  }


  return (
    <div id="searchContent">
    
     
      <div className="input-container">
        <h2>THỜI GIAN</h2>
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
      <div className="input-container">
            <label>Hãng Xe</label>
            <Autocomplete
                id="combo-box-brand"
                value={brandValue}
                onChange={(event, value) => {
                  setBrandValue(value);
                }}
                options={brand}
                getOptionLabel={(option) => option.name || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
              <label>Loại Nhiên Liệu</label>
              <Autocomplete
                id="combo-box-engine"
                value={engineTypeValue}
                onChange={(event, value) => {
                  setEngineTypeValue(value);
                }}
                options={listEngineType}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
            <label>Bộ Chuyển số</label>
            <Autocomplete
                id="combo-box-transmission"
                value={transmissionValue}
                onChange={(event, value) => {
                  setTransmissionValue(value);
                }}
                options={listTransmissionType}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
        </div>
        <div className="input-container">
            <label>Tên</label>
            <TextField
                   fullWidth
                    variant="outlined"
                    margin="dense"
                    value={nameValue}
                    onChange={(e) => {
                      setNameValue(e.target.value);
                    }}
            />
            <label>Mẫu</label>
            <TextField
                   fullWidth
                    variant="outlined"
                    margin="dense"
                    value={modelValue}
                    onChange={(e) => {
                      setModelValue(e.target.value);
                    }}
            />
            <label>Số Ghế</label>
            <TextField
                   fullWidth
                    variant="outlined"
                    margin="dense"
                    value={seatsValue}
                    onChange={(e) => {
                      setSeatsValue(e.target.value);
                    }}
            />
        </div>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default SearchContent;
