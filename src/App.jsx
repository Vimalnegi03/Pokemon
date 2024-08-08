import { Link } from 'react-router-dom';
import './App.css';
import CustomRoutes from './routes/customRoutes/CustomRoutes';

function App() {
  return (
    <div className=' min-h-screen flex flex-col items-center justify-center bg-gray-900'>
      <h1 className=' text-4xl md:text-5xl lg:text-6xl text-white my-4'>
        <Link to='/' className='text-white'>Pokedex</Link>
      </h1>
      <div className='w-full px-4'>
        <CustomRoutes />
      </div>
    </div>
  );
}

export default App;
