import { Link } from 'react-router-dom';

function Pokemon({ name, image, id }) {
    return (
        <div className='flex justify-center p-4'>
            <Link to={`/pokemon/${id}`} className='block max-w-xs p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='text-center text-lg font-bold text-white mb-2'>{name}</div>
                <div className='flex justify-center'>
                    <img className='w-full h-auto rounded-lg' src={image} alt={name} />
                </div>
            </Link>
        </div>
    );
}

export default Pokemon;
