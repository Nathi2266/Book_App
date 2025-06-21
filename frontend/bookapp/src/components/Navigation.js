import { Flex, Link, Box, Button, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      bgGradient={colorMode === 'dark' 
        ? 'linear(to-r, brand.700, brand.600)' 
        : 'linear(to-r, brand.500, brand.300)'}
      px={4} 
      shadow="lg"
    >
      <Flex h={20} maxW="container.lg" mx="auto" justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg" color="white">
          <Link 
            as={RouterLink} 
            to="/" 
            _hover={{ textDecoration: 'none', opacity: 0.8 }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            📚 BookVerse
          </Link>
        </Heading>
        <Flex gap={4} alignItems="center">
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
          />
          <Button 
            as={RouterLink} 
            to="/login" 
            color="white"
            variant="ghost"
            _hover={{ bg: 'blackAlpha.200' }}
          >
            Login
          </Button>
          <Button 
            as={RouterLink} 
            to="/register" 
            colorScheme="whiteAlpha"
            variant="solid"
            _hover={{ transform: 'scale(1.05)' }}
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation; 