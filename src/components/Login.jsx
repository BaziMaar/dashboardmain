import { useState } from 'react';
import { styled } from '@mui/system';
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const StyledCard = styled(Card)({
  minWidth: 320,
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
  background: 'linear-gradient(145deg, #1C253A, #16202E)',
  color: '#fff',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  color: '#fff',
});

const StyledTextField = styled(TextField)({
  '.MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  },
  '.MuiInputLabel-root': {
    color: '#A8FF7A',
  },
  '.MuiOutlinedInput-input': {
    color: '#fff',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#A8FF7A',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#A8FF7A',
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #001B48, #005792)',
  color: '#A8FF7A',
  padding: '10px 16px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  borderRadius: '8px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #005792, #001B48)',
  },
}));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (formData.username === 'ashu' && formData.password === '54321@sHu') {
      toast.success('Admin Logged In Successfully!', {
        style: { backgroundColor: '#001B48', color: '#A8FF7A' }, // Custom color for success toast
      });
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      window.location.replace('/home');
      setFormData({ username: '', password: '' });
    } else {
      toast.error('Invalid Credentials', {
        style: { backgroundColor: '#f44336', color: '#fff' }, // Custom color for error toast
      });
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(to right, #0C1821, #1C253A)' }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: '#A8FF7A' }}>
            Bazi Maar Dashboard
          </Typography>
          <StyledForm noValidate autoComplete="off">
            <StyledTextField
              label="👤 Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange('username')}
            />
            <StyledTextField
              label="🔒 Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility style={{ color: '#A8FF7A' }} /> : <VisibilityOff style={{ color: '#A8FF7A' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton variant="contained" onClick={handleLogin}>
              Login
            </StyledButton>
          </StyledForm>
        </CardContent>
      </StyledCard>

      {/* Add ToastContainer to display toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
