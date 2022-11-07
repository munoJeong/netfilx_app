import request from "./api/request";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";
import {Routes, Route , Outlet} from "react-router-dom";
import './styles/App.css'
import MainPage from "./routes/MainPage";
import DetailPage from "./routes/DetailPage";
import SearchPage from "./routes/SearchPage";

const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>

      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id ="NO" fetchUrl ={request.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl ={request.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl ={request.fetchTopRated}/>
      <Row title="Action Movie" id="AM" fetchUrl ={request.fetchActionMovies}/>  
      <Row title="Horror Movie" id="FM" fetchUrl ={request.fetchHorrorMovies}/>
      <Row title="Adventure Movie" id="VM" fetchUrl={request.fetchAdventureMovies}/>
      <Row title="Animation Movie" id="NM" fetchUrl={request.fetchAnimationMovies}/>
      <Row title="Documentaries" id="DM" fetchUrl={request.fetchDocumentaries}/>
      <Footer /> */}
    </div>
  );
}

export default App;
