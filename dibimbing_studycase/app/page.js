'use client';

import React, { useState } from 'react';
import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import client from './apollo-client';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';

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

const DELETE_NOTE = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;

const NoteList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_NOTES);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data.getAllNotes.length === 0) {
    return <p>Tidak ada catatan</p>;
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote({
        variables: { id },
      });
      refetch(); // Refetch the notes to update the list
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
    onOpen();
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-3 h-4/5 overflow-auto'>
        {data.getAllNotes.map(note => (
          <Card key={note.id} maxW='sm'>
            <CardBody onClick={() => handleCardClick(note)}>
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
                  <Button onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }} variant='solid' colorScheme='red'>Delete</Button>
                  <EditNote note={note} />
                </ButtonGroup>
              </Stack>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedNote && (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedNote.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{selectedNote.body}</Text>
              <Text fontSize='xs' mt='4'>Created At: {new Date(selectedNote.createdat).toLocaleString()}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={(e) => { e.stopPropagation(); handleDelete(selectedNote.id); }} variant='solid' colorScheme='red'>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <main className="max-w-7xl mx-auto p-24">
          <h1 className="text-center my-5 gap-4">Note App</h1>
          <AddNote />
          <NoteList />
        </main>
      </ChakraProvider>
    </ApolloProvider>
  );
}
