import { Box, Heading, Input, Button, Link, Text, FormControl, FormLabel } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login form submitted', formData);
    navigate('/home');
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </FormControl>
        <FormControl mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full" mb={4}>
          Sign In
        </Button>
        <Text textAlign="center">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/register" color="blue.500">
            Register
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default Login;
