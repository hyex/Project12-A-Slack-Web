import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import myAxios from '@util/myAxios'
import LoginPage from '@page/User/LoginPage'
import WorkspacePage from '@page/Workspace/WorkspacePage'
import WorkspaceJoinPage from '@page/Workspace/WorkspacJoinPage'
import O from '@organism'

const App = () => {
  const token = localStorage.getItem('token')
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const history = useHistory()

  const [_, accessToken] = window.location.search.split('=')

  if (accessToken) {
    localStorage.setItem('token', accessToken)
    window.location.href = '/'
  }

  const checkToken = async (): Promise<boolean> => {
    try {
      const {
        data: { success },
      } = await myAxios.get({ path: '/user/status' })
      if (success) {
        setIsAuth(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const checkUser = async () => {
    if (!token) {
      history.push('/login')
    }
    if (token) {
      try {
        await checkToken()
        history.push('/')
      } catch (err) {
        history.push('/login')
      }
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <GlobalStyle />
      <O.Header />
      <Router>
        <Switch>
          <Route exact path="/" component={WorkspacePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/workspace/join" component={WorkspaceJoinPage} />
        </Switch>
      </Router>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100vw;
  }
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-size: 62.5%;
  }
`

export default App
