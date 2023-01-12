import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'

import './index.css'

const VideoItem = props => {
  const {details} = props
  const {id, publishedAt, thumbnailUrl, title, viewCount, channel} = details
  let publishedAgo = formatDistanceToNow(new Date(publishedAt))
  publishedAgo = publishedAgo
    .replace('about', '')
    .replace('almost', '')
    .replace('over', '')
  publishedAgo += ' ago'
  return (
    <li className="home-video">
      <Link to={`/videos/${id}`} className="link">
        <img src={thumbnailUrl} alt={title} className="video-logo" />
        <div className="video-flex">
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            className="channel-logo"
          />
          <div className="video-details">
            <p className="video-title">{title}</p>
            <p className="channel-name">{channel.name}</p>
            <div className="views-pub-cont">
              <p>{viewCount} views </p>
              <p className="date-posted">
                <BsDot />
                {publishedAgo}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoItem
