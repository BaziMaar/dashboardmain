import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { useState } from 'react';
function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', options);
}
const columns = [
    { field: '_id', headerName: 'Tournament ID', width: 250 },
    { field: 'tournament_name', headerName: 'Tournament Name', width: 400, sortable: true },
    { field: 'price', headerName: 'Winning Prize', type: 'number', width: 290, sortable: true },
    { 
      field: 'start_time', 
      headerName: 'Tournament Start Time', 
      width: 400, 
      sortable: true,
      valueGetter: (params) => new Date(params.row.start_time).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }) 
    },
    { 
      field: 'end_time', 
      headerName: 'Tournament End Time', 
      width: 400, 
      sortable: true,
      valueGetter: (params) => new Date(params.row.end_time).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }) 
    },
    { field: 'category_name', headerName: 'Category Name', width: 300, sortable: true },
    { 
      field: 'short_description', 
      headerName: 'Short Description', 
      width: 500, 
      sortable: true 
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 500, 
      sortable: false,
      renderCell: (params) => (
        <div style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          lineHeight: '1.5em',
          maxHeight: '4.5em',
          whiteSpace: 'normal',
        }}>
          {params.value}
        </div>
      ),
    },
  ];
  
  
export default function Tournament() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogLabel, setDialogLabel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = React.useState([]);
  const [productData, setProductData] = useState({
    tournament_name: '',
    tournament_image: '',
    price: 0,
    start_time: '',
    end_time: '',
    category_name: '',
    short_description: '',
    description: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://sattajodileak.com/home/getTournament`);
      console.log(response);
      const rowsWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));
      setData(rowsWithIds);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    fetchData();

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
  }, []);

  const openDialog = (label) => {
    setDialogLabel(label);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue(''); // Reset input value when dialog is closed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDialogSubmit = (productData) => {
    console.log(`>>>>>>${JSON.stringify(productData)}`)
    // Send data to POST API
    axios.post('https://sattajodileak.com/home/addTournament', productData)
      .then(response => {
        console.log('Post successful', response);
        closeDialog();
      })
      .catch(error => {
        console.error('Error posting data', error);
      });
  };


  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>
      <Header />
      <br />
      <div style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'monospace', textAlign: 'center' }}>Products Dashboard</div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Button style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Add Product Number')}>
          Add Tournament
        </Button>
      </div>
      <div style={{ flex: 1, marginBottom: '10px', display: 'flex', justifyContent: 'center', background: '#d8dfeb' }}>
        {data && data.length>0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          className="custom-data-grid"
          checkboxSelection
          autoHeight
          style={{ background: ' #cce0e0', boxShadow: '0px 8px 16px rgba(159, 181, 181, 0.9)', paddingRight: '10px', width: '80%', fontFamily: 'monospace' }} // Adjust table height automatically
        />):(<div>Loading...</div>)}
      </div>
      <br />
      <Footer />
      <Dialog open={isDialogOpen} onClose={closeDialog}>
  <DialogTitle style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', width: '400px', textAlign: 'center' }}>
    Enter Tournament Details
  </DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      id="tournament_name"
      label="Tournament Name"
      type="text"
      fullWidth
      name="tournament_name"
      value={productData.tournament_name}
      onChange={handleInputChange}
    />
        <TextField
      autoFocus
      margin="dense"
      id="tournament_image"
      label="Tournament Image Link"
      type="text"
      fullWidth
      name="tournament_image"
      value={productData.tournament_image}
      onChange={handleInputChange}
    />

    <TextField
      margin="dense"
      id="price"
      label="Winning Prize"
      type="number"
      fullWidth
      name="price"
      value={productData.price}
      onChange={handleInputChange}
    />
    <TextField
      margin="dense"
      id="start_time"
      label="Start Time (YYYY-MM-DDTHH:mm:ss)"
      type="text"
      fullWidth
      name="start_time"
      value={productData.start_time}
      onChange={handleInputChange}
    />
    <TextField
      margin="dense"
      id="end_time"
      label="End Time (YYYY-MM-DDTHH:mm:ss)"
      type="text"
      fullWidth
      name="end_time"
      value={productData.end_time}
      onChange={handleInputChange}
    />
    <TextField
      margin="dense"
      id="category_name"
      label="Category Name"
      type="text"
      fullWidth
      name="category_name"
      value={productData.category_name}
      onChange={handleInputChange}
    />
    <TextField
      margin="dense"
      id="entry_fee"
      label="Entry Fee"
      type="number"
      fullWidth
      name="entry_fee"
      value={productData.entry_fee}
      onChange={handleInputChange}
    />
        <TextField
      margin="dense"
      id="short_description"
      rows={2}
      multiline
      label="Short Description"
      type="text"
      fullWidth
      name="short_description"
      value={productData.short_description}
      onChange={handleInputChange}
    />
<TextField
  margin="dense"
  id="description"
  label="Description"
  type="text"
  fullWidth
  name="description"
  value={productData.description}
  onChange={handleInputChange}
  multiline
  rows={4} // This displays approximately four lines
  inputProps={{
    maxLength: 3000, // Limits the input to approximately 500 words (average word length is 6 characters)
  }}
/>

  </DialogContent>
  <DialogActions>
    <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={closeDialog}>
      Cancel
    </Button>
    <Button
      style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }}
      onClick={() => handleDialogSubmit(productData)}
    >
      Submit
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}
