import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/detailpage.css'

function DetailPage() {

  const [movie, setMovie] = useState({});

  //paramiter 값을 가져오는 Hook 함수
  let {movieId} = useParams();
  console.log('movieId', movieId);
  console.log('useParams()',useParams() );

  const fetchData= async () =>{
    const request = await axios.get(`/movie/${movieId}`);
    console.log('request', request);
    setMovie(request.data);
  }

  useEffect(()=>{
    fetchData();
  },[movieId]);

  if(!movie) return <div>...loading</div>
  return (
    <section>
      <img className='modal__poster-img' 
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
      alt="poster" />
      <div className='modal_content'>
        <div className='modal_con_input'>
        <p className='modal_title'>{movie.title ? movie.title : movie.name}</p>
        <p className='modal_details'>평점 : {movie.vote_average}</p>
        <p className="modal_overview">{movie.overview}</p>
        <div className='modal_play'>
          <img src='https://e7.pngegg.com/pngimages/507/373/png-clipart-google-play-button-computer-icons-button-angle-rectangle.png'></img>
          <p className='modal_play_text'>재생</p>
        </div>
        </div>
      </div>



          {/* <Iframe 
            src={`https://www.youtube.com/embed/${movie.videos}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} 
            width='640' height='360' frameBorder='0' allow="autoplay; fullscreen"
            title='YouTube video player' allowFullScreen
          ></Iframe> */}
    </section>
  )
}

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
export default DetailPage