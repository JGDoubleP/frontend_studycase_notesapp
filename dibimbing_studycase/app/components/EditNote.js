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
import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

// GraphQL Mutation to edit a note
const EDIT_NOTE_MUTATION = gql`
  mutation EditNote($id: String!, $title: String!, $body: String!) {
    editNote(id: $id, title: $title, body: $body) {
      id
      title
      body
      createdat
    }
  }
`;

const EditNote = ({ note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [editNote] = useMutation(EDIT_NOTE_MUTATION);
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async () => {
    try {
      // Call the mutation to edit the note
      const { data } = await editNote({
        variables: {
          id: note.id,
          title,
          body,
        },
      });

      // Display a success message
      toast({
        title: "Note updated.",
        description: `Note "${data.editNote.title}" has been updated successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();  // Close the modal
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: "Error",
        description: "There was an error updating the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='text-center'>
      <Button variant='ghost' colorScheme='blue' onClick={onOpen}>Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
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
}

export default EditNote;
