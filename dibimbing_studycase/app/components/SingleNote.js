'use client';

import { Card, CardHeader, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const SingleNote = () => {
  return (
    <div>
        <Card maxW='sm'>
        <CardBody>
            <Stack mt='6' spacing='3'>
            <Heading size='md'>Title</Heading>
            <Text>
                hello
            </Text>
            <Text color='blue.600' fontSize='2xl'>
                $450
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
                Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
                Add to cart
            </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
    </div>
  )
}

export default SingleNote;