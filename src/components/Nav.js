import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] =useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      //console.log("window.scrollY", window.scrollY);
      if(window.scrollY > 50){
        setShow(true);
      }else{
        setShow(false);
      }
    });
  },[]); // 배열이 비어있으면 컴포넌트가 실행됬을때 실행

  const onChange = e =>{
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    // 스크롤을 내리면 배경이 까맣게 변함, 조건
     //show가 true일때 nav__black
    <nav className={`nav ${show && "nav__black"}`}> 
      <img 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='Netflix logo'
        className='nav__logo'
        onClick={()=> (window.location.href = "/netfilx_app")} 
      />

      <input type="search" value={searchValue} onChange={onChange} placeholder="영화를 검색해주세요." className='nav__input' />

      <img 
        src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
        alt='User logged'
        className='nav__avatar'
      />
    </nav>
  )
}

export default Nav