import useDebounce from '../../hooks/useDebounce';

function Search({ updateSearchTerm }) {
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value));
    
    return (
        <div className="flex justify-center p-4 bg-gray-800">
            <input 
                id="pokemon-name-search"
                type="text"
                placeholder="Search Pokemon..."
                className="w-full max-w-lg p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={debouncedCallback}
            />
        </div>
    );
}

export default Search;
