'use client';

import React from 'react';
import { ChakraProvider, Card, CardHeader, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from './apollo-client';
import AddNote from './components/AddNote';

// Define the GraphQL query
const GET_ALL_NOTES = gql`
  query notesApp {
    getAllNotes {
      createdat 
      body
      id
      title
    }
  }
`;

// Component to fetch and display notes
const NoteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='grid grid-cols-3 gap-3 h-60 overflow-auto'>
      {data.getAllNotes.map(note => (
        <Card key={note.id} maxW='sm'>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{note.title}</Heading>
              <Text>{note.body}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Stack>
              <Text fontSize='xs'>Created At: {new Date(note.createdat).toLocaleString()}</Text>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>Delete</Button>
                <Button variant='ghost' colorScheme='blue'>Edit</Button>
              </ButtonGroup>
            </Stack>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <main className="max-w-4xl mx-auto p-24">
          <h1 className="text-center my-5 gap-4">Note App</h1>
          <AddNote />
          <NoteList />
        </main>
      </ChakraProvider>
    </ApolloProvider>
  );
}
