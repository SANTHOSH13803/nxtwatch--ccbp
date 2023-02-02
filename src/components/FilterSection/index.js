import './index.css'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
// import {Component} from 'react'
// import {v4} from 'react-uuid'
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from 'react-router-dom'
import ThemeContext from '../../Context/context'
import {
  ChangeTheme,
  ActiveIcon,
  ActiveText,
  ActiveItem,
} from '../StyledComponents/styledComponents'

const contactIconDetails = [
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png',
    altText: 'facebook logo',
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png',
    altText: 'twitter logo',
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png',
    altText: 'linked in logo',
  },
]

const filterIcons = [
  {
    id: 'Home',
  },
  {
    id: 'Trending',
  },
  {
    id: 'Gaming',
  },
  {
    id: 'Saved Videos',
  },
]

const FilterSection = p => {
  const {activeTab} = p
  const renderContactSection = () => (
    <div className="contact-section">
      <p>CONTACT US</p>
      <ul>
        {contactIconDetails.map(each => {
          const {imageUrl, altText} = each
          return (
            <li key={altText}>
              <img src={imageUrl} alt={altText} />
            </li>
          )
        })}
      </ul>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  )

  const filterTop = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <ul className="filter-top">
            <ActiveItem
              key="HOME"
              isActive={filterIcons[0].id === activeTab}
              isDark={isDarkMode}
            >
              <ActiveIcon
                isDark={isDarkMode}
                isActive={filterIcons[0].id === activeTab}
              >
                <AiFillHome className="filter-icon" />
              </ActiveIcon>
              <ActiveText
                isDark={isDarkMode}
                isActive={filterIcons[0].id === activeTab}
              >
                <Link to="/" className="link">
                  Home
                </Link>
              </ActiveText>
            </ActiveItem>
            <ActiveItem
              isActive={filterIcons[1].id === activeTab}
              isDark={isDarkMode}
              key="TRENDING"
            >
              <ActiveIcon
                isDark={isDarkMode}
                isActive={filterIcons[1].id === activeTab}
              >
                <AiFillFire className="filter-icon" />
              </ActiveIcon>
              <ActiveText
                isDark={isDarkMode}
                isActive={filterIcons[1].id === activeTab}
              >
                <Link to="/trending" className="link">
                  Trending
                </Link>
              </ActiveText>
            </ActiveItem>
            <ActiveItem
              isActive={filterIcons[2].id === activeTab}
              isDark={isDarkMode}
              key="GAMING"
            >
              <ActiveIcon
                isDark={isDarkMode}
                isActive={filterIcons[2].id === activeTab}
              >
                <SiYoutubegaming className="filter-icon" />
              </ActiveIcon>
              <Link to="/gaming" className="link">
                <ActiveText
                  isDark={isDarkMode}
                  isActive={filterIcons[2].id === activeTab}
                >
                  {filterIcons[2].id}
                </ActiveText>
              </Link>
            </ActiveItem>
            <ActiveItem
              isActive={filterIcons[3].id === activeTab}
              isDark={isDarkMode}
              key="SAVED-VIDEOS"
            >
              <ActiveIcon
                isDark={isDarkMode}
                isActive={filterIcons[3].id === activeTab}
              >
                <MdPlaylistAdd className="filter-icon" />
              </ActiveIcon>
              <Link to="/saved-videos" className="link">
                <ActiveText
                  isDark={isDarkMode}
                  isActive={filterIcons[3].id === activeTab}
                >
                  {filterIcons[3].id}
                </ActiveText>
              </Link>
            </ActiveItem>
          </ul>
        )
      }}
    </ThemeContext.Consumer>
  )

  //   console.log('filter page')
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value

        return (
          <ChangeTheme className="filter-container" isDark={isDarkMode}>
            {filterTop()}
            {renderContactSection()}
          </ChangeTheme>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default FilterSection
