import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'

const ComponentContainer = styled.div`
  height: 75vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  console.log(credentials)

  const onChangeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()

    axios.post('http://localhost:5555/api/register', credentials)
      .then(success => {
        console.log(success)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ComponentContainer>
      <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' name='username' value={credentials.username} onChange={onChangeHandler} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' name='password' value={credentials.password} onChange={onChangeHandler} />
        </Form.Field>
        <Button type='submit'>SignUp</Button>
    </Form>
  </ComponentContainer>
  )
}

export default SignUp