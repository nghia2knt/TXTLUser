import { Avatar, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCar } from "../../../actions/cars.action";
import { getSelfInvoices } from "../../../actions/invoices.action";
import * as actions from "../../../actions/user.action";
import "./MessageContent.scss";
import { io } from 'socket.io-client';
import apiService from "../../../services/api.service";

const columns = [
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'fromUser', label: 'Gửi từ', minWidth: 10 },
    { id: 'content', label: 'Nội dung', minWidth: 10 },
  ];

  let socket;

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}



export const initiateSocketConnection = (room) => {
	socket = io.connect('https://38fm7gpbdf.execute-api.us-east-2.amazonaws.com', {reconnect: true});
	console.log(`Connecting socket...`);
}

const MessageContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);
  const [data,setData] = useState([])
  const [mess, setMess] = useState('')

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())

    }else {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    const callback =  (msg) => {
        apiService
        .message()
        .getMessagesSelf()
        .then((response) => {
            setData(response.data.data)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    };
    apiService
    .user()
    .getUserByJWT()
    .then((response) => {
      initiateSocketConnection();
      socket.on(response.data.data.email, callback);
        return () => {
        socket.off(response.data.data.email, callback);
        disconnectSocket();
        }
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally();

    
 }, [])

 useEffect(() => {
    apiService
    .message()
    .getMessagesSelf()
    .then((response) => {
        setData(response.data.data)
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

  const onSendMess= (e) => {
    e.preventDefault();
    const body = {
      content: mess
    }
    apiService
    .message()
    .sendMess(userProfile.id, body)
    .then((response) => {
      socket.emit('sendMess',response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)
    })
    setMess('')

  }

  return (
    <div id="messageContent">
      {userProfile && data &&(
        <Paper>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          Gửi Tin Nhắn Hỗ Trợ
          </Typography>
          <Fragment>
                <Typography variant="h6" textAlign="center">Nhập nội dung tin nhắn</Typography>
              <form onSubmit={(e) => onSendMess(e)}>
                <TextField id="name" label="" variant="outlined" autoComplete='off'
 className="text-field" fullWidth value={mess} onChange={(e) => setMess(e.target.value)}/>
                  <Button type="submit" variant="contained">
                    Send
                  </Button>
              </form>
                
            </Fragment>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                     const value = row[column.id];
                     if (column.id == 'toUser') {
                       return (
                         <TableCell key={column.id} align={column.align}>
                             
                             <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name}</a>                            </TableCell>
                       );
                     } else if (column.id == 'fromUser') {
                       return (
                         <TableCell key={column.id} align={column.align}>
                             <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name+" ("+value.roles+")"}</a>
                             
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

export default MessageContent;
