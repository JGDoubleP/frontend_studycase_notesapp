import AddNote from "./components/AddNote";
import { ChakraProvider} from '@chakra-ui/react'
import Notelist from "./components/Notelist";
import SingleNote from "./components/singleNote";

export default function Home() {
  return (
    <ChakraProvider>
      <main className="max-w-4xl mx-auto p-24" >
        <h1 className="text-center my-5 gap-4">Note App</h1>
        <AddNote/>
        <div className='grid grid-cols-3 gap-3 h-60 overflow-auto'>
        <SingleNote/>
        <SingleNote/>
        <SingleNote/>
    </div>
      </main>
    </ChakraProvider>
  );
}
