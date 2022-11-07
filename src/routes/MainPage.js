import React from 'react'
import request from '../api/request'
import Banner from '../components/Banner'
import Row from '../components/Row'

function MainPage() {
  return (
    <div>
      <Banner />
      <Row title="NETFLIX ORIGINALS" id ="NO" fetchUrl ={request.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl ={request.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl ={request.fetchTopRated}/>
      <Row title="Action Movie" id="AM" fetchUrl ={request.fetchActionMovies}/>  
      <Row title="Horror Movie" id="FM" fetchUrl ={request.fetchHorrorMovies}/>
      <Row title="Adventure Movie" id="VM" fetchUrl={request.fetchAdventureMovies}/>
      <Row title="Animation Movie" id="NM" fetchUrl={request.fetchAnimationMovies}/>
      <Row title="Documentaries" id="DM" fetchUrl={request.fetchDocumentaries}/>
    </div>
  )
}

export default MainPage