import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Textarea, List, ListItem, IconButton, useToast, Flex } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const BookNotes = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`/api/books/${id}/notes`);
                setNotes(response.data);
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchNotes();
    }, [id]);

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        
        try {
            setLoading(true);
            await axios.post('/api/notes', {
                book_id: id,
                content: newNote
            });
            setNewNote('');
            const response = await axios.get(`/api/books/${id}/notes`);
            setNotes(response.data);
            toast({
                title: 'Note added',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Error adding note:', err);
            toast({
                title: 'Error adding note',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`/api/notes/${noteId}`);
            setNotes(notes.filter(note => note.id !== noteId));
            toast({
                title: 'Note deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Error deleting note:', err);
            toast({
                title: 'Error deleting note',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="xl" mx="auto" p={4}>
            <Button mb={4} onClick={() => navigate(-1)}>Back to Book List</Button>
            <Heading mb={6}>Book Notes</Heading>
            
            <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                mb={4}
            />
            <Button
                onClick={handleAddNote}
                colorScheme="blue"
                isLoading={loading}
                mb={8}
            >
                Add Note
            </Button>

            <List spacing={3}>
                {notes.map(note => (
                    <ListItem key={note.id} p={4} borderWidth={1} borderRadius="md">
                        <Flex justify="space-between" align="center">
                            <Text>{note.content}</Text>
                            <IconButton
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                size="sm"
                                onClick={() => handleDeleteNote(note.id)}
                            />
                        </Flex>
                        <Text fontSize="sm" color="gray.500" mt={2}>
                            {new Date(note.timestamp).toLocaleString()}
                        </Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BookNotes; 