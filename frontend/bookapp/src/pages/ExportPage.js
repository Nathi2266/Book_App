import { Box, Button, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

const ExportPage = () => {
    const [loading, setLoading] = useState(false);

    const handleExport = async (type) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/export/books.${type}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `books_export.${type}`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Export error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="xl" mx="auto" p={4}>
            <Heading mb={6}>Export Library</Heading>
            <Button
                colorScheme="green"
                mr={4}
                isLoading={loading}
                onClick={() => handleExport('csv')}
            >
                Export as CSV
            </Button>
            <Button
                colorScheme="red"
                isLoading={loading}
                onClick={() => handleExport('pdf')}
                isDisabled={true} // Enable after implementing PDF
            >
                Export as PDF (Coming Soon)
            </Button>
            
            <Alert status="info" mt={4}>
                <AlertIcon />
                CSV export contains all books in your library
            </Alert>
        </Box>
    );
};

export default ExportPage; 