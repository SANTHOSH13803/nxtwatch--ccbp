import './index.css'
import ThemeContext from '../../Context/context'

const darkThemeUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
const lightThemeUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

const ErrorPage = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const url = isDarkMode ? darkThemeUrl : lightThemeUrl
      return (
        <div className="error-page">
          <img src={url} alt="failure view" />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request.
            <br />
            Please try again.
          </p>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default ErrorPage
