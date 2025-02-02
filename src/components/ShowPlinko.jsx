import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, IconButton, Card, CardContent, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Plinko = () => {
  const [data, setData] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0); // Track current page (starting from 0)
  const [pageSize, setPageSize] = useState(10); // Track page size
  const [rowCount, setRowCount] = useState(0); // Total number of records
  const handlePageChange=()=>{
    setPage(page+1);
  }

  // Fetch data from the API
  const fetchData = async (page, pageSize) => {
    try {
      const response = await axios.get('https://sattajodileak.com/mines/getPlinkoEntry', {
        params: {
          page: page + 1, // API expects pages starting from 1
          limit: 100,
        },
      });
      const transformedData = response.data.entries.map((item) => ({
        id: item._id,
        bet: `${parseFloat(item?.bet?.$numberDecimal || item.bet || 0)}`,
        payOut: `${parseFloat(item?.payOut?.$numberDecimal || item.payOut || 0)}`,
        profit: `${parseFloat(item?.profit?.$numberDecimal || item.profit || 0)}`,
        user_id: item.user_id,
        createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        gameName: item.game,
      }));
      
      setData(transformedData);
      setRowCount(response.data.totalEntries); // Set the total number of entries
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts or page/pageSize changes
  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'bet', headerName: 'Bet', width: 120 },
    { field: 'payOut', headerName: 'Payout', width: 120 },
    { field: 'profit', headerName: 'Profit', width: 120 },
    
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    { field: 'gameName', headerName: 'Game Name', width: 150 },
  ];

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    margin: '8px 0',
    display: 'block',
    color: 'black',
    background: '#DADADA',
    padding: '8px',
    borderRadius: '4px',
    transition: 'color 0.3s',
  };

  return (
    <div>
      {/* Header with Sidebar Button */}
      <header
        style={{
          textAlign: 'center',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          background: '#F1F1F1',
          color: 'black',
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
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ color: 'black' }}>Plinko Dashboard</h2>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: '250px', padding: '20px', background: '#DADADA' }}>
          <Link to="/" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            All Transactions
          </Link>
          <Link to="/pending" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Pending Withdrawal Requests
          </Link>
          <Link to="/approved" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Approved Transactions
          </Link>
          <Link to="/users" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            All Users
          </Link>
          <Link to="/lastUsers" onClick={() => setDrawerOpen(false)} style={linkStyle}>
            Last 7 days Users
          </Link>
        </div>
      </Drawer>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
          background: '#F1F1F1',
        }}
      >
        {/* Data Grid Table */}
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          sx={{
            bgcolor: '#DADADA',
            color: 'black',
            '& .MuiDataGrid-cell': {
              fontSize: '14px',
            },
          }}
        />
        <Button onClick={handlePageChange}>Next Page</Button>
      </div>

      <footer style={{ textAlign: 'center', padding: '10px', color: '#99E9FA', background: '#DADADA' }}>
        <p>&copy; 2024 Bazi Maar</p>
      </footer>
    </div>
  );
};

export default Plinko;
