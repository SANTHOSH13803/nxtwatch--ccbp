import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ErrorPage from '../ErrorPage'
import {
  HeadingDiv,
  CustomIcon,
  VideoList,
} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'
import FilterSection from '../FilterSection'
import './index.css'

const statusVariable = {
  initial: 'I',
  success: 'S',
  failure: 'f',
  loading: 'l',
}

class GamingSection extends Component {
  state = {gamesList: [], apiStatus: statusVariable.initial}

  componentDidMount() {
    this.getGames()
  }

  getGames = async () => {
    this.setState({apiStatus: statusVariable.loading})
    const ApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(ApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({apiStatus: statusVariable.success, gamesList: updatedData})
    } else {
      this.setState({apiStatus: statusVariable.failure})
    }
  }

  onClickRetry = () => {
    this.getGames()
  }

  onRenderLoader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const loaderColor = isDarkMode ? '#ffffff' : ' #212121'
        return (
          <div className="loader-container-player" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={loaderColor}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderFailure = () => (
    <div className="error-page-button-align">
      <ErrorPage />
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  onRenderSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {gamesList} = this.state
        return (
          <>
            <HeadingDiv isDark={isDarkMode} className="h-heading">
              <CustomIcon isDark={isDarkMode} className="custom-icon">
                <SiYoutubegaming className="red-icon" />
              </CustomIcon>
              <h1>Gaming</h1>
            </HeadingDiv>
            <VideoList isDark={isDarkMode} className="gaming-videos">
              <ul className="game-list-ul">
                {gamesList.map(each => {
                  const {id, title, thumbnailUrl, viewCount} = each

                  return (
                    <Link to={`/videos/${id}`} className="link" key={id}>
                      <li key={each.id}>
                        <img src={thumbnailUrl} alt="video thumbnail" />
                        <p className="g-title">{title}</p>
                        <p className="view-count">
                          {viewCount} Watching Worldwide
                        </p>
                      </li>
                    </Link>
                  )
                })}
              </ul>
            </VideoList>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusVariable.success:
        return this.onRenderSuccess()
      case statusVariable.loading:
        return this.onRenderLoader()
      case statusVariable.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <VideoList isDark={isDarkMode} data-testid="gaming">
              <Header />
              <div className="result-container">
                <FilterSection activeTab="Gaming" />
                <div className="width-100">{this.renderResult()}</div>
              </div>
            </VideoList>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default GamingSection
