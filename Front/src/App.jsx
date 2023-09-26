import { useState, useEffect } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { LoginComponent  } from './components/LoginComponent ';
import { SignUp } from './components/SignUp';

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

  //Functions

  const logout = () => {
    localStorage.removeItem('auth-token');
    setHeader((prevHeader) => ({
      ...prevHeader,
      'auth-token': ''
    }));
    setAuth(false);
  };

  //Keep Login on re-render

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      setHeader((prevHeader) => ({
        ...prevHeader,
        'auth-token': authToken
      }));
      setAuth(true);
    }
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
        <Dashboard host={host} header={header} />
      </div>
    );
  };
};

export default App;
