import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {BsDot} from 'react-icons/bs'
import FilterSection from '../FilterSection'
import ErrorPage from '../ErrorPage'
import {VideoList, LikesDislikeBtn} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'
import Header from '../Header'
import './index.css'

const StatusVariables = {
  initial: 'I',
  success: 'S',
  failure: 'F',
  loading: 'L',
}
class videoPlayDetails extends Component {
  state = {
    videoData: '',
    apiStatus: StatusVariables.initial,
    like: false,
    dislike: false,
    saved: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: StatusVariables.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = {
        channel: fetchedData.video_details.channel,
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        publishedAt: fetchedData.video_details.published_at,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        title: fetchedData.video_details.title,
        videoUrl: fetchedData.video_details.video_url,
        viewCount: fetchedData.video_details.view_count,
      }
      this.setState({
        videoData: updatedData,
        apiStatus: StatusVariables.success,
      })
    } else {
      this.setState({apiStatus: StatusVariables.failure})
    }
  }

  onClickRetry = () => {
    this.getDetails()
  }

  onClickLike = () => {
    this.setState(prev => ({like: !prev.like, dislike: false}))
  }

  onClickDisLike = () => {
    this.setState(prev => ({dislike: !prev.dislike, like: false}))
  }

  onClickSave = () => {
    this.setState({saved: true})
  }

  onRenderSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {videoData, like, dislike, saved} = this.state
        const {
          channel,
          description,
          publishedAt,
          //   thumbnailUrl,
          title,
          videoUrl,
          viewCount,
        } = videoData
        let publishedAgo = formatDistanceToNow(new Date(publishedAt))
        publishedAgo = publishedAgo
          .replace('about', '')
          .replace('almost', '')
          .replace('over', '')
        publishedAgo += ' ago'
        const {isDarkMode, addCartItems} = value
        const onSavedClicked = () => {
          addCartItems(videoData)
        }
        return (
          <>
            <div className="player-container">
              <ReactPlayer
                url={videoUrl}
                //   light={thumbnailUrl}
                //   controls
                //   progressInterval={`${12}`}
                width="100%"
                height="100%"
                //   playing
                className="video-player"
              />
            </div>
            <div className="player-item-details">
              <p className="player-title">{title}</p>
              <div className="likes-views-container">
                <div className="views-pub-cont l">
                  <p>{viewCount} views </p>
                  <p className="date-posted">
                    <BsDot />
                    {publishedAgo}
                  </p>
                </div>
                <div className="like-share">
                  <LikesDislikeBtn
                    isDark={isDarkMode}
                    isActive={like}
                    type="button"
                    onClick={this.onClickLike}
                  >
                    <span>
                      <AiOutlineLike />
                    </span>
                    Like
                  </LikesDislikeBtn>
                  <LikesDislikeBtn
                    isActive={dislike}
                    isDark={isDarkMode}
                    type="button"
                    onClick={this.onClickDisLike}
                  >
                    <span>
                      <AiOutlineDislike />
                    </span>
                    Dislike
                  </LikesDislikeBtn>
                  <LikesDislikeBtn
                    isDark={isDarkMode}
                    isActive={saved}
                    type="button"
                    onClick={onSavedClicked}
                  >
                    <p className="saved-span" onClick={this.onClickSave}>
                      <MdPlaylistAdd />
                      {saved ? 'Saved' : 'Save'}
                    </p>
                  </LikesDislikeBtn>
                </div>
              </div>
              <hr className="hr-pv" />
              <div className="video-flex">
                <img
                  src={channel.profile_image_url}
                  alt="channel logo"
                  className="player-channel-logo"
                />
                <div className="channel-details">
                  <p className="channel-name bolder">{channel.name}</p>
                  <p className="subs">{channel.subscriber_count} subscribers</p>
                </div>
              </div>
              <p className="video-description">{description}</p>
            </div>
          </>
        )
      }}
    </ThemeContext.Consumer>
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

  renderFailure = () => (
    <div className="error-page-button-align">
      <ErrorPage />
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  onRenderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case StatusVariables.success:
        return this.onRenderSuccess()
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
            <>
              <Header />
              <div className="result-container">
                <FilterSection activeTab="" />
                <VideoList
                  isDark={isDarkMode}
                  className="video-item-details-container"
                  data-testid="videoItemDetails"
                >
                  {this.onRenderResult()}
                </VideoList>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default videoPlayDetails
