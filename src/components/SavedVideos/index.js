import {AiFillFire} from 'react-icons/ai'
// import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import {
  HeadingDiv,
  CustomIcon,
  VideoList,
} from '../StyledComponents/styledComponents'
import VideosList from '../VideosList'

import ThemeContext from '../../Context/context'
import FilterSection from '../FilterSection'
import './index.css'

const SavedVideos = () => {
  const NoVideosList = () => (
    <div className="no-videos-const">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, cartList} = value
        const condition = cartList.length > 0

        return (
          <VideoList isDark={isDarkMode} data-testid="savedVideos">
            <Header />
            <div className="result-container">
              <FilterSection activeTab="Saved Videos" />
              <VideoList isDark={isDarkMode} className="width-100">
                {!condition ? (
                  NoVideosList()
                ) : (
                  <>
                    <HeadingDiv isDark={isDarkMode} className="h-heading">
                      <CustomIcon isDark={isDarkMode} className="custom-icon">
                        <AiFillFire className="red-icon" />
                      </CustomIcon>
                      <h1>Saved Videos</h1>
                    </HeadingDiv>
                    <VideosList details={cartList} />
                  </>
                )}
              </VideoList>
            </div>
          </VideoList>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default SavedVideos
