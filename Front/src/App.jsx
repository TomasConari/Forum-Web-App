import { useState, useEffect } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { LoginComponent  } from './components/LoginComponent ';
import { SignUp } from './components/SignUp';
import jwt_decode from 'jwt-decode';

const App = () => {

  //Variables

  const host = "http://localhost:8000"; // Here goes Api Url, this url needs to be the same as the one in the Apirest.

  //States

  const [error, setError] = useState("");
  const [Auth, setAuth] = useState(false);
  const [login, setLogin] = useState(true);
  const [header, setHeader] = useState({
    'Content-type': 'application/json',
    'auth-token': ''
  });
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    lastname: "",
    username: "",
    role: ""
  });

  //Functions

  console.log(userInfo)

  const logout = () => {
    localStorage.removeItem('auth-token');
    setHeader((prevHeader) => ({
      ...prevHeader,
      'auth-token': ''
    }));
    setUserInfo({
      id: "",
      name: "",
      lastname: "",
      username: "",
      role: ""
    });
    setAuth(false);
  };

  //Keep Login on re-render

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    if(authToken){
      setHeader((prevHeader) => ({
        ...prevHeader,
        'auth-token': authToken
      }));
      setUserInfo(jwt_decode(authToken));
      setAuth(true);
    };
  }, []);

  //return

  if(!Auth){
    return(
      <div className='login-box'>
        <h1>Forum</h1>
        <br />
        <form className='login'>
          {login ? 
            <LoginComponent
              setUserInfoProp={setUserInfo}
              hostProp={host} 
              authProp={setAuth} 
              errorProp={setError} 
              setHeaderProp={setHeader} 
              headerProp={header} 
            /> 
            : 
            <SignUp 
              hostProp={host} 
              errorProp={setError} 
              headerProp={header}
              setLoginProp={setLogin}
              loginProp={login}
            />
          }
          <div className='buttons'>
            <a href="#" onClick={() => setLogin(!login)}>
              {login ? "You dont have an Account? SignUp" : "Already have an Account? Login"}
            </a>
          </div>
          {error && <a id='error'><span/><span/><span/><span/>{error}</a>}
        </form>
      </div>
    );
  }else{
    return(
      <div>
        <button onClick={logout}>Logout</button>
        <Dashboard localUser={userInfo} host={host} header={header} />
      </div>
    );
  };
};

export default App;
