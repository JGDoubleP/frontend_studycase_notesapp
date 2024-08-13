'use client';
import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
 } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// GraphQL Mutation to create a note
const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($id: String!, $title: String!, $body: String!) {
    createNote(id: $id, title: $title, body: $body) {
      id
      title
      body
      createdat
    }
  }
`;

const AddNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createNote] = useMutation(CREATE_NOTE_MUTATION);
  const toast = useToast();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleSubmit = async () => {
    try {
      const newNote = {
        id: `${Date.now()}`,  // Generate a unique ID using current timestamp
        title,
        body,
      };
      
      // Call the mutation to create a new note
      const { data } = await createNote({
        variables: {
          id: newNote.id,
          title: newNote.title,
          body: newNote.body,
        },
      });

      // Display a success message
      toast({
        title: "Note created.",
        description: `Note "${data.createNote.title}" has been created successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setTitle('');
      setBody('');
      onClose();  // Close the modal
    } catch (error) {
      console.error('Error creating note:', error);
      toast({
        title: "Error",
        description: "There was an error creating the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='text-center'>
      <Button onClick={onOpen} bg='#2ab2c9' color={'white'} width='100%'>
        Add Notes <AddIcon marginLeft={"10px"}/>
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input 
                ref={initialRef} 
                placeholder='Note title' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea 
                placeholder='Note body' 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNote;
