import { Box, Heading, Input, Button, Link, Text, FormControl, FormLabel, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Register form submitted', formData);
    navigate('/home');
  };

  return (
    <Box 
      maxW="md" 
      mx="auto" 
      mt={20} 
      p={6} 
      borderWidth={1} 
      borderRadius="2xl"
      boxShadow="xl"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </FormControl>
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
          Create Account
        </Button>
        <Text textAlign="center">
          Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="blue.500">
            Login
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default Register;
