import { Box, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DailyQuote = () => {
    const [quote, setQuote] = useState('');
    const toast = useToast();

    const fetchQuote = useCallback(async () => {
        try {
            const response = await axios.get('/api/daily');
            setQuote(response.data.quote);
        } catch (err) {
            console.error('Error fetching quote:', err);
            toast({
                title: 'Error loading quote',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [toast]);

    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    return (
        <Box maxW="xl" mx="auto" p={4}>
            <Heading mb={6}>Daily Reading Inspiration</Heading>
            <Text fontSize="xl" mb={4} fontStyle="italic">"{quote}"</Text>
            <Button colorScheme="blue" onClick={fetchQuote}>
                Get New Quote
            </Button>
        </Box>
    );
};

export default DailyQuote; 