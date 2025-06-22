import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, TableContainer, Button, Flex, Container, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (err) {
        setError('Could not fetch books from the server. Is the backend running?');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [location.key]);

  if (loading) {
    return (
      <Container centerContent mt={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container mt={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" mt={8}>
      <Card borderWidth="1px" borderRadius="lg">
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">Book Collection</Heading>
            <Button as={RouterLink} to="/add-book" colorScheme="blue">
              Add New Book
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          {books.length === 0 ? (
            <Box textAlign="center" p={4}>
              <Text>No books found. Add one to get started!</Text>
            </Box>
          ) : (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th isNumeric>Pages</Th>
                    <Th>Published</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {books.map((book) => (
                    <Tr key={book.id}>
                      <Td>{book.title}</Td>
                      <Td>{book.author}</Td>
                      <Td isNumeric>{book.pages}</Td>
                      <Td>{book.published}</Td>
                      <Td>
                        <Button 
                          as={RouterLink} 
                          to={`/book/${book.id}/notes`}
                          size="sm" 
                          colorScheme="teal"
                        >
                          Notes
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Home;
