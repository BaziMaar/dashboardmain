import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  Drawer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CrossIcon from '../assets/cross.svg';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const DepositTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [phone, setPhone] = useState('');
  const [amount,setAmount]=useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);
  const [openBlock, setOpenBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sortModel, setSortModel] = useState([]);
  const [id,setId]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sattajodileak.com/wallet/getTrans');
        const fetchedData = response.data.wallets.reduce((acc, user) => {
          const userDeposits = user.walletTrans
            .filter((transaction) => {return (transaction.amount >= 0 )})
            .map((transaction) => ({
              key: transaction._id,
              phone: user.phone,
              amount: Math.abs(transaction.amount).toFixed(2),
              amount_status: 'Deposit',
              time: new Date(transaction.time).toLocaleString(),
              paymentId: transaction.paymentId,
              bankId: transaction.bankId,
              ifscCode: transaction.ifscCode,
              utr: transaction.utr,
              status: transaction.status === 0 ? 'Pending' : transaction.status === 1 ? 'Approved' : 'Rejected',
            }));

          return [...acc, ...userDeposits];
        }, []);

        const sortedData = fetchedData.reverse();
        setData(sortedData);

        setColumns([
          { field: 'phone', headerName: 'Phone', width: 150 },
          { field: 'amount', headerName: 'Amount', width: 100 },
          { field: 'amount_status', headerName: 'Request Type', width: 150 },
          { field: 'status', headerName: 'Status', width: 120 },
          { field: 'utr', headerName: 'UTR No.', width: 200 },
          { field: 'time', headerName: 'Time', width: 200 },
          {
            field: 'accept',
            headerName: 'Accept Payment',
            width: 180,
            renderCell: (params) =>
              params.row.utr && params.row.status === 'Pending' ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlePayment(params.row.phone, params.row.amount, 'accept', params.row.key)}
                >
                  Accept
                </Button>
              ) : null,
          },
          {
            field: 'reject',
            headerName: 'Reject Payment',
            width: 180,
            renderCell: (params) =>
              params.row.utr && params.row.status === 'Pending' ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleOpenBlock(params.row.phone,params.row.amount,params.row.key)}
                >
                  Reject
                </Button>
              ) : null,
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenBlock = (phone,amount,key) => {
    setOpenBlock(true);
    setIsButtonDisabled(true)
    setPhone(phone);
    setAmount(amount)
    setId(key)
    
    
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
    setPhone('');
    setMessage('');
  };

  const handleBlockMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleRejectSubmit = async () => {
    try {
      // First, update the status of the transaction
      await updateStatus(phone, amount, 2, id); // Status 2 indicates rejection
  
      // Fetch the user data
      const userResponse = await axios.get(`https://sattajodileak.com/user/getUser?search=${phone}`);
      const user = userResponse.data.data[0];
      console.log(user)
  
      // Ensure that the token exists
      if (!user || !user.token) {
        alert('User token is missing for this number.');
        return;
      }
  
      // Ensure that both title and body for the notification are present
      const title = 'Payment Rejected by BaaziMaar';
      if (!title || !message) {
        alert('Notification title or body is missing.');
        return;
      }
  
      // Send the notification
      const response = await axios.post('https://sattajodileak.com/notification/send', {
        token: user.token,
        title: title,
        body: message,
      });
  
      // Close the block modal
      handleCloseBlock();
  
      // Optional: handle response or additional success logic here
    } catch (error) {
      // Handle any errors in the process
      alert('An error occurred while rejecting the payment or sending the notification.');
      console.error('Error blocking user or sending notification:', error);
    }
  };
  
  const handlePayment = async (phone, amount, status, id) => {
    setIsButtonDisabled(true);
    try {
      await updateStatus(phone, amount, 1, id); // Status 1 means approved
      const user = await axios.get(`https://sattajodileak.com/user/getUser?search=${phone}`);
      const users = user.data.data[0];
      const token=users.token
      console.log(users)
      await axios.post('https://sattajodileak.com/notification/send', {
        token: token,
        title: 'Payment Accepted by BaaziMaar',
        body: `Your payment of amount ${amount} has been accepted.`,
      });
      await axios.post('https://sattajodileak.com/wallet/adminDeposit',{
        phone,
        amount:parseInt(amount)  
      })

      alert(`Payment of ${amount} accepted for phone number ${phone}.`);
      setIsButtonDisabled(false);
    } catch (error) {
      console.error('Error accepting payment:', error);
      setIsButtonDisabled(false);
    }
  };

  const updateStatus = async (phone, amount, status, id) => {
    try {
      await axios.post('https://sattajodileak.com/wallet/updateStatus', {
        phone,
        amount,
        status,
        id,
      });

    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    margin: '8px 0',
    display: 'block',
    backgroundColor: '#081A30',
    color: 'lightblue',
    padding: '10px',
    borderRadius: '5px',
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: '#102339',
          color: 'lightblue',
          textAlign: 'center',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ marginLeft: '6in' }}>
          <h2>Deposit Transactions</h2>
        </div>
      </header>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ textAlign: 'left', padding: '10px', background: '#102339' }}>
          <img
            src={CrossIcon}
            alt="Close Icon"
            style={{ width: '25px', height: '25px', cursor: 'pointer', background: 'white', borderRadius: '17px' }}
            onClick={toggleDrawer(false)}
          />
        </div>
        <div style={{ height: '100vh', width: '250px', padding: '20px', background: '#102339' }}>
          <Link to="/transaction" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            All Transactions
          </Link>
          <Link to="/pending" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Pending Requests
          </Link>
          <Link to="/approved" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Approved Transactions
          </Link>
          <Link to="/users" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            All Users
          </Link>
          <Link to="/weeklyUsers" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Weekly Users
          </Link>
          <Link to="/daily" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Daily Transactions
          </Link>
          <Link to="/week" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Weekly Transactions
          </Link>
        </div>
      </Drawer>

      <Paper style={{ padding: '20px', margin: '20px' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              sortModel={sortModel}
              onSortModelChange={(newModel) => setSortModel(newModel)}
              getRowId={(row) => row.key}
              initialState={{
                sorting: { sortModel: [{ field: 'time', sort: 'desc' }] },
              }}
            />
          </div>
        )}
      </Paper>

      <Dialog open={openBlock} onClose={handleCloseBlock}>
        <DialogTitle>Reject Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Rejection Reason"
            type="text"
            fullWidth
            value={message}
            onChange={handleBlockMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBlock} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRejectSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepositTable;
