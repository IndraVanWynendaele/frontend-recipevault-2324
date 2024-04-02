import { Link, useLocation } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function NotFound() {
    const {pathname} = useLocation();

    return (
        <>
            <Box>
                <Heading>Not Found</Heading>
                <Text>There is nothing at {' '}{pathname},{' '} <Link to="/" replace>Go back to Home</Link></Text>
            </Box>
        </>
    );
}