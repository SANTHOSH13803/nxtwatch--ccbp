import ThemeContext from '../../Context/context'
import Header from '../Header'
import './index.css'
import {VideoList} from '../StyledComponents/styledComponents'
import FilterSection from '../FilterSection'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const url = isDarkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Header />
          <div className="result-container">
            <FilterSection />

            <VideoList isDark={isDarkMode} className="not-found">
              <img src={url} alt="not found" />
              <h1>Page Not Found</h1>
              <p>We are sorry, the page you requested could not be found</p>
            </VideoList>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
