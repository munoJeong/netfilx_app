import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/request';
import '../styles/Banner.css';
import styled from 'styled-components';

function Banner() {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsclicked] = useState(false);

  useEffect(() =>{
    fetchData();
  },[]);

  const truncate =(str, n) =>{
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; //str.length가 n보다 클때 0~99까지만 출력하고 그뒤는 ...
  }
  const fetchData = async ()=>{ //현재 상영중인 영화 정보를 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    //console.log(request);

    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length + 0) //가져온 20개중에 랜덤으로 하나
    ].id;

    const {data:movieDetail} = await axios.get(`movie/${movieId}`,{
      params:{append_to_response:"videos"}
    });
    setMovie(movieDetail);
    
  }
  if(!isClicked){
  return (
    <header className='banner' 
    style={{
    //backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
    backgroundPosition: "top center",
    backgroundSize:"cover",
    }}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name};
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button play'
            onClick={() => setIsclicked (true)}>Play</button>
          <button className='banner__button info'>More Infomation</button>
        </div>
        <p className='banner__description'>
          {truncate(movie.overview, 100)}
        </p>

      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  )
  }else{
    return(
      <Container>
        <HomeContainer>
          <Iframe 
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} 
            width='640' height='360' frameBorder='0' allow="autoplay; fullscreen"
            title='YouTube video player' allowFullScreen
          ></Iframe>
        </HomeContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;

`;
const Iframe = styled.iframe`
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.65;
border: none;
&::after{
  content: "";
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
}
`;
 // div뒤에 백틱 `` 안에 css 적용
export default Banner