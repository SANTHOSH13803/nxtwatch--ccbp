import './index.css'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
// import {Component} from 'react'
import uuid from 'react-uuid'
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
      <h1>CONTACT US</h1>
      <ul>
        {contactIconDetails.map(each => {
          const {imageUrl, altText} = each
          return (
            <li key={uuid()}>
              <img src={imageUrl} alt={altText} />
            </li>
          )
        })}
      </ul>
      <p>Enjoy Now to see your channels and recommendations!</p>
    </div>
  )

  const filterTop = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <ul className="filter-top">
            <Link to="/" className="link" key={uuid()}>
              <ActiveItem
                key={uuid()}
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
                  {filterIcons[0].id}
                </ActiveText>
              </ActiveItem>
            </Link>
            <Link to="/trending" className="link" key={uuid()}>
              <ActiveItem
                key={uuid()}
                isActive={filterIcons[1].id === activeTab}
                isDark={isDarkMode}
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
                  {filterIcons[1].id}
                </ActiveText>
              </ActiveItem>
            </Link>
            <Link to="/gaming" className="link" key={uuid()}>
              <ActiveItem
                key={uuid()}
                isActive={filterIcons[2].id === activeTab}
                isDark={isDarkMode}
              >
                <ActiveIcon
                  isDark={isDarkMode}
                  isActive={filterIcons[2].id === activeTab}
                >
                  <SiYoutubegaming className="filter-icon" />
                </ActiveIcon>
                <ActiveText
                  isDark={isDarkMode}
                  isActive={filterIcons[2].id === activeTab}
                >
                  {filterIcons[2].id}
                </ActiveText>
              </ActiveItem>
            </Link>
            <Link to="/saved-videos" className="link" key={uuid()}>
              <ActiveItem
                key={uuid()}
                isActive={filterIcons[3].id === activeTab}
                isDark={isDarkMode}
              >
                <ActiveIcon
                  isDark={isDarkMode}
                  isActive={filterIcons[3].id === activeTab}
                >
                  <MdPlaylistAdd className="filter-icon" />
                </ActiveIcon>
                <ActiveText
                  isDark={isDarkMode}
                  isActive={filterIcons[3].id === activeTab}
                >
                  {filterIcons[3].id}
                </ActiveText>
              </ActiveItem>
            </Link>
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
