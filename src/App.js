import Footer from "./components/Footer";
import Nav from "./components/Nav";
import {Routes, Route , Outlet} from "react-router-dom";
import './styles/App.css'
import MainPage from "./routes/MainPage";
import DetailPage from "./routes/DetailPage";
import SearchPage from "./routes/SearchPage";
import { useEffect, useState } from "react";
import Auth from "./routes/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";





function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => { 
    onAuthStateChanged(authService, (user)=>{  //현재 로그인한 사람의 정보
      if(user){
        //user is signed in
        setIsLoggedIn(user);
        setUserObj(user);
        //const uid = user.uid;

      } else{ //로그인한 사용자가 없으면 로그아웃
        setIsLoggedIn(false);
        //user us signed out
      }
      setInit(true);
    });
  }, []) ;

  const Layout = () => {
    return(
      <div>
        <Nav init={init} userObj={userObj} isLoggedIn={Boolean(isLoggedIn)} />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route> 
        
          <Route path="/" element={<Auth />} />
        

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
