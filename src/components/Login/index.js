import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LoginInputs, Para, Label} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'

const lightThemeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkThemeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class Login extends Component {
  state = {
    passwordType: 'password',
    errorMsg: '',
    username: '',
    password: '',
    error: false,
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onClickShowPassword = () => {
    const {passwordType} = this.state
    if (passwordType === 'text') {
      this.setState({passwordType: 'password'})
    } else {
      this.setState({passwordType: 'text'})
    }
  }

  onSubmitClicked = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userData = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: fetchedData.error_msg, error: true})
    }
  }

  render() {
    const {passwordType, errorMsg, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const websiteLogo = !isDarkMode ? lightThemeImage : darkThemeImage
          return (
            <div className="login-container">
              <form
                className="login-form-container"
                onSubmit={this.onSubmitClicked}
              >
                <img src={websiteLogo} alt="website logo" />
                <div className="login-input-container">
                  <Label isDark={isDarkMode} htmlFor="username">
                    USERNAME
                  </Label>
                  <br />
                  <LoginInputs
                    type="text"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                    isDark={isDarkMode}
                  />
                </div>
                <div className="login-input-container">
                  <Label isDark={isDarkMode} htmlFor="password">
                    PASSWORD
                  </Label>
                  <br />
                  <LoginInputs
                    isDark={isDarkMode}
                    type={passwordType}
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                </div>
                <div type="button" className="login-show-msg-container">
                  <input
                    type="checkbox"
                    id="showpassword"
                    onClickCapture={this.onClickShowPassword}
                  />
                  <Label isDark={isDarkMode} htmlFor="showpassword">
                    <Para isDark={isDarkMode}>Show Password</Para>
                  </Label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {error && <p className="error-msg">*{errorMsg}</p>}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
