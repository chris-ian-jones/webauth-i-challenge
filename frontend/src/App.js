import React from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'

import SignUp from './components/SignUp'
import Login from './components/Login'

const StyledNav = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`
const NavContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  padding: 30px 30px 0 0;
`

function App() {
  return (
    <div className="App">
      <StyledNav>
        <NavContainer>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/login">
            <p>Login</p>
          </Link>
          <Link to="/signup">
            <p>Sign Up</p>
          </Link>
        </NavContainer>
      </StyledNav>

      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/login' component={Login} />
    </div>
  )
}

export default App;
