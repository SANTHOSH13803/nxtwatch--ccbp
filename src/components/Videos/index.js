import {Component} from 'react'

import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
// import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ErrorPage from '../ErrorPage'
import {SearchBarInput, SearchBar} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'
import './index.css'
import VideoItem from '../VideoItem'

const StatusVariables = {
  initial: 'I',
  success: 'S',
  failure: 'F',
  loading: 'L',
}
const lightThemeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

class HomeVideoSection extends Component {
  state = {
    searchInput: '',
    submitSearch: '',
    videosList: '',
    apiStatus: StatusVariables.initial,
    Banner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  onClickCloseBanner = () => {
    this.setState({Banner: false})
  }

  renderBanner = () => (
    <div className="banner-section" data-testid="banner">
      <div className="place-close-btn">
        <button
          type="button"
          onClick={this.onClickCloseBanner}
          data-testid="close"
        >
          <AiOutlineClose className="close-btn-icon" />
        </button>
      </div>
      <img src={lightThemeImage} alt="nxt watch logo" />
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button type="button" className="get-it-now-btn">
        GET IT NOW
      </button>
    </div>
  )

  getVideos = async () => {
    const {submitSearch} = this.state
    this.setState({apiStatus: StatusVariables.loading})
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${submitSearch}`
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const {videos} = fetchedData

      const UpdatedData = videos.map(each => ({
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({videosList: UpdatedData})
      this.setState({apiStatus: StatusVariables.success})
    } else {
      this.setState({apiStatus: StatusVariables.failure})
    }
  }

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onClickRetry = () => {
    this.setState({searchInput: '', submitSearch: ''}, this.getVideos)
  }

  onFailureRetry = () => {
    this.setState(
      {
        searchInput: '',
        submitSearch: '',
        videosList: '',
        apiStatus: StatusVariables.initial,
      },
      this.getVideos,
    )
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({submitSearch: searchInput}, this.getVideos)
  }

  onInputEnterClicked = e => {
    if (e.key === 'Enter') {
      this.onClickSearchIcon()
    }
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case StatusVariables.loading:
        return this.renderLoader()
      case StatusVariables.success:
        return this.renderVideosSection()
      case StatusVariables.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="home-failure-view">
      <ErrorPage />
      <button type="button" className="retry-btn" onClick={this.onFailureRetry}>
        Retry
      </button>
    </div>
  )

  showVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {searchInput, Banner} = this.state
        return (
          <div>
            {Banner && this.renderBanner()}
            <div className="show-videos">
              <SearchBar className="search-bar-cont" isDark={isDarkMode}>
                <SearchBarInput
                  type="search"
                  className="search-input"
                  isDark={isDarkMode}
                  onChange={this.onChangeSearch}
                  value={searchInput}
                  onKeyPress={this.onInputEnterClicked}
                />
                <button
                  type="button"
                  onClick={this.onClickSearchIcon}
                  className="bnt1"
                  data-testid="searchButton"
                >
                  <AiOutlineSearch className="search-icon" />
                </button>
              </SearchBar>
              {this.renderResult()}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const loaderColor = isDarkMode ? '#ffffff' : ' #212121'
        return (
          <div className="loader-container-home" data-testid="loader">
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

  renderVideosSection = () => {
    const {videosList, submitSearch} = this.state
    const condition = videosList.length > 0
    let filteredVideos
    if (condition && submitSearch !== '') {
      filteredVideos = videosList.filter(each =>
        each.title.toLowerCase().includes(submitSearch.toLowerCase()),
      )
    } else {
      filteredVideos = videosList
    }
    return (
      <>
        {condition ? (
          <ul className="v-section">
            {filteredVideos.map(each => (
              <VideoItem details={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <>{this.renderNoFilterPage()}</>
        )}
      </>
    )
  }

  renderNoFilterPage = () => (
    <div className="on-no-filters-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />

      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>

      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    return <>{this.showVideos()}</>
  }
}

export default HomeVideoSection
