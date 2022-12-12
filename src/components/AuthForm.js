import React, { useState } from 'react'
import {authService} from '../fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import '../styles/AuthForm.scss'
import { Link } from 'react-router-dom';

function AuthForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); // 회원가입이냐
  const [error, setError] = useState("");

  const onChange = e =>{
    //console.log(e.target.name); 체인지가 발동했을때 

    const {target:{name, value}} = e;
    if(name === "email"){
      setEmail(value); // input에 name을 지정, 이벤트가 발생한 곳의 name이 같으면 value를 셋
    }else if(name === "password"){
      setPassword(value); 
    }
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    // try{
    //   let data;

    //   if(newAccount){
    //     //create newAccount
    //     data = await createUserWithEmailAndPassword(authService, email, password);
    //   }else{
    //     //Log In
    //     data = await signInWithEmailAndPassword(authService, email, password);
    //   }
    //   // console.log(data); 회원가입을 마친 사용자 정보
    // }catch(error){
    //   console.log(error);
    //   setError(error.message);
    // }
  }

  const toggleAccount = () => setNewAccount((prev) =>!prev); //클릭할때마다 true false 변경
  return (
    <div>
      <p className='title'>로그인</p>
        <form onSubmit={onSubmit} className="container">
        <input type ="email" placeholder="이메일 주소 또는 전화번호" required name="email"
        onChange={onChange} value={email} className="authInput"
        />
        <input type ="password" placeholder="비밀번호" required name="password"
        onChange={onChange} value = {password} className="authInput"
        />

        <Link to ="/"> <input type ="submit" className='authInput authSubmit' value={ '로그인' }/></Link>
        
        {error && 
        <span className='authError'>{error}</span>
        }
      </form>
      
    </div>
  )
}

export default AuthForm