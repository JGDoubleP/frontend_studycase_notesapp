'use client';

import AddNote from "./components/AddNote";
import { ChakraProvider} from '@chakra-ui/react'
import Notelist from "./components/Notelist";
import SingleNote from "./components/singleNote";
import { Card, CardHeader, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <main className="max-w-4xl mx-auto p-24" >
        <h1 className="text-center my-5 gap-4">Note App</h1>
        <AddNote/>

        <div className='grid grid-cols-3 gap-3 h-60 overflow-auto'>
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
          <CardFooter >
            <Stack>
            <Text fontSize='xs'>created At : </Text>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                Delete
              </Button>
              <Button variant='ghost' colorScheme='blue'>
                Edit
              </Button>
            </ButtonGroup>
            </Stack>
          </CardFooter>
        </Card>
        </div>
        
      </main>
    </ChakraProvider>
  );
}
