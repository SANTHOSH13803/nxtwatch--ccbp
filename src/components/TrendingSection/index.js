import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import VideosList from '../VideosList'
import {
  HeadingDiv,
  CustomIcon,
  VideoList,
} from '../StyledComponents/styledComponents'
import ErrorPage from '../ErrorPage'
import ThemeContext from '../../Context/context'
import FilterSection from '../FilterSection'
import './index.css'

const StatusVariables = {
  initial: 'I',
  success: 'S',
  failure: 'F',
  loading: 'L',
}

class TrendingSection extends Component {
  state = {apiStatus: StatusVariables.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  onClickRetry = () => {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: StatusVariables.loading})
    const ApiUrl = 'https://apis.ccbp.in/videos/trending'
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(ApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      this.setState({
        trendingList: updatedData,
        apiStatus: StatusVariables.success,
      })
    } else {
      this.setState({apiStatus: StatusVariables.failure})
    }
  }

  renderFailure = () => (
    <div className="error-page-button-align">
      <ErrorPage />
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

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

  renderSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {trendingList} = this.state
        return (
          <>
            <HeadingDiv
              isDark={isDarkMode}
              className="h-heading"
              data-testid="banner"
            >
              <CustomIcon isDark={isDarkMode} className="custom-icon">
                <AiFillFire className="red-icon" />
              </CustomIcon>
              <h1>Trending</h1>
            </HeadingDiv>
            <VideosList details={trendingList} />
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case StatusVariables.success:
        return this.renderSuccess()
      case StatusVariables.loading:
        return this.onRenderLoader()
      case StatusVariables.failure:
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
            <VideoList isDark={isDarkMode} data-testid="trending">
              <Header />
              <div className="result-container">
                <FilterSection activeTab="Trending" />
                <div className="width-100">{this.renderResult()}</div>
              </div>
            </VideoList>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default TrendingSection
