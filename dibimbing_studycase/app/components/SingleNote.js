'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const SingleNote = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering on the server
  }

  return (
      <Card maxW='sm'>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Title 2</Heading>
            <Text>
              Body
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Delete
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Edit
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
  );
}

export default SingleNote;
