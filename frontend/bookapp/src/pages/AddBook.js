import { Box, Heading, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    pages: '',
    published: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      toast({
        title: 'Validation Error',
        description: 'Title and Author are required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/books', {
        ...formData,
        pages: formData.pages || null,
        published: formData.published || null
      });
      console.log('API Response:', response);
      toast({
        title: 'Book added',
        description: 'New book has been added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/home', { state: { refresh: true } });
    } catch (err) {
      console.error('API Error:', err);
      console.error('Error Response:', err.response);
      toast({
        title: 'Error',
        description: err.response?.data?.error || err.message || 'Failed to add book',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Add New Book
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Author</FormLabel>
          <Input
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Pages</FormLabel>
          <Input
            type="number"
            value={formData.pages}
            onChange={(e) => setFormData({...formData, pages: e.target.value})}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Published Date</FormLabel>
          <Input
            type="date"
            value={formData.published}
            onChange={(e) => setFormData({...formData, published: e.target.value})}
          />
        </FormControl>

        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full" 
          isLoading={loading}
          loadingText="Submitting..."
        >
          Add Book
        </Button>
      </form>
    </Box>
  );
};

export default AddBook;
