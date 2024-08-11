'use client';
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const AddNote = () => {
  return (
    <div className='text-center'>
        <Button bg='#2ab2c9' color={'white'} width='100%'>Add Notes<AddIcon marginLeft={"10px"}/></Button>
    </div>
  )
}

export default AddNote;
