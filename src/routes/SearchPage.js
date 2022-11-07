import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import { useDebounce } from '../hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResult] = useState([]);

  console.log('useLocation()', useLocation()); //
  const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
  }

  const navigate = useNavigate()
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  },[searchTerm]);

  const fetchSearchMovie = async (searchTerm) =>{
    try{
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      console.log('request', request);
      setSearchResult(request.data.results);

    }catch(error){
      console.log ("error" , error);
    }
  }
  const renderSearchResult = () =>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return(
              
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                <img src={movieImageUrl} alt= {movie.title || movie.name || movie.original_name}        className = 'movie__poster' />
                </div>  
              </div>
              
            )
          }
        })}
      </section>
    ) : (
      <section className ="no-results">
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return renderSearchResult();
}

export default SearchPage