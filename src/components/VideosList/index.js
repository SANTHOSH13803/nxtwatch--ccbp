import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import './index.css'
import {VideoList} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'

const VideosList = props => {
  const {details} = props

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <VideoList isDark={isDarkMode} className="videos-list">
            <ul>
              {details.map(each => {
                const {
                  id,
                  title,
                  thumbnailUrl,
                  name,
                  viewCount,
                  publishedAt,
                } = each
                let publishedAgo = formatDistanceToNow(new Date(publishedAt))
                publishedAgo = publishedAgo
                  .replace('about', '')
                  .replace('almost', '')
                  .replace('over', '')
                publishedAgo += ' ago'
                return (
                  <Link to={`/videos/${id}`} className="link" key={id}>
                    <li className="list-item" key={id}>
                      <img
                        src={thumbnailUrl}
                        alt="video thumbnail"
                        className="thumbnail"
                      />
                      <div className="video-list-container">
                        <h1>{title}</h1>
                        <p>{name}</p>
                        <div className="views-pub-cont l">
                          <p>{viewCount} views </p>
                          <p className="date-posted">
                            <BsDot />
                            {publishedAgo}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </VideoList>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideosList
