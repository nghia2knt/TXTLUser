import { Typography } from "@material-ui/core";
import React, { useState } from "react";

import "./HelpContent.scss";
import huongdan1 from "./huongdan1.png";
import huongdan2 from "./huongdan2.png";
import huongdan3 from "./huongdan3.png";
import huongdan4 from "./huongdan4.png";

const HelpContent = () => {

  return (
    <div id="helpContent">
      <h2>HƯỚNG DẪN NGƯỜI DÙNG</h2>
      <h3>HƯỚNG DẪN THUÊ XE</h3>
      <img src={huongdan1}></img>

      <Typography>
                Người dùng chọn chức năng 'thuê xe' trên thanh điều hướng
      </Typography>
      <img src={huongdan2}></img>

       <Typography>
                Người dùng chọn thời gian thuê xe, bao gồm bắt đầu và kết thúc và nhấn tìm kiếm
      </Typography>
      <img src={huongdan3}></img>

      <Typography>
                Người dùng chọn xe ưa thích và bấm và nút THUÊ NGAY 
      </Typography>
      <img src={huongdan4}></img>

      <Typography>
                Người dùng xem lại thông tin và xác nhận
      </Typography>

    </div>
  );
};

export default HelpContent;
