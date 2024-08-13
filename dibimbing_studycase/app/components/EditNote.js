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


const EditNote = () => {
  return (
    <div className='text-center'>
      <Button variant='ghost' colorScheme='blue'>Edit</Button>
    </div>  
  )
}

export default EditNote;
