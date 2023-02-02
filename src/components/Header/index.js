import {withRouter, Link} from 'react-router-dom'
// import {Component} from 'react'
import {IoMoon, IoSunnyOutline} from 'react-icons/io5'
import Popup from 'reactjs-popup'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'
import {
  AiFillHome,
  AiFillFire,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
// import {Component} from 'react'
// import uuid from 'react-uuid'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../Context/context'
import {
  ChangeTheme,
  ActiveIcon,
  ActiveText,
  ActiveItem,
  SvgIcon,
  CancelBtn,
  VideoList,
  //   SideBar,
} from '../StyledComponents/styledComponents'

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

const lightThemeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkThemeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const Header = props => {
  const filterTop = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        let activeTab = 'Home'
        const onClickHome = () => {
          activeTab = 'Home'
        }
        const onClickTrending = () => {
          activeTab = 'Trending'
        }
        return (
          <ul className="align-c">
            <Link to="/" className="link" key="sjalsjdf">
              <ActiveItem
                key="dfjahljfasl"
                isActive={filterIcons[0].id === activeTab}
                isDark={isDarkMode}
                onClick={onClickHome}
              >
                <div className="specific-width">
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
                </div>
              </ActiveItem>
            </Link>
            <Link to="/trending" className="link" key="qeuyrwu">
              <ActiveItem
                key="3870q80q"
                isActive={filterIcons[1].id === activeTab}
                isDark={isDarkMode}
                onClick={onClickTrending}
              >
                <div className="specific-width">
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
                </div>
              </ActiveItem>
            </Link>
            <Link to="/gaming" className="link" key="nxcvn,cv">
              <ActiveItem
                key="ncxvnxv"
                isActive={filterIcons[2].id === activeTab}
                isDark={isDarkMode}
              >
                <div className="specific-width">
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
                </div>
              </ActiveItem>
            </Link>
            <Link to="/saved-videos" className="link" key="nbdfiush">
              <ActiveItem
                key="eiuc,vn,nihfd"
                isActive={filterIcons[3].id === activeTab}
                isDark={isDarkMode}
              >
                <div className="specific-width">
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
                </div>
              </ActiveItem>
            </Link>
          </ul>
        )
      }}
    </ThemeContext.Consumer>
  )

  //   const onClickMenu = () => {
  //     const navEle = document.getElementById('navbar')
  //     navEle.classList.toggle('active')
  //   }
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, toggleTheme} = value
        const websiteLogo = !isDarkMode ? lightThemeImage : darkThemeImage
        return (
          <ChangeTheme isDark={isDarkMode}>
            <nav className="header-cont">
              <Link to="/" className="link">
                <button type="button">
                  <img src={websiteLogo} alt="website logo" />
                </button>
              </Link>
              <div className="phone-icons">
                <button type="button" onClick={toggleTheme} data-testid="theme">
                  {!isDarkMode ? (
                    <IoMoon className="header-icons" />
                  ) : (
                    <IoSunnyOutline className="header-icons color-white" />
                  )}
                </button>

                {/* Menu */}
                {/* <button type="button">
                  <SvgIcon isDark={isDarkMode} onClick={onClickMenu}>
                    <AiOutlineMenu className="header-icons" />
                  </SvgIcon>
                </button> */}
                <Popup
                  modal
                  trigger={
                    <button type="button">
                      <SvgIcon isDark={isDarkMode}>
                        <AiOutlineMenu className="header-icons" />
                      </SvgIcon>
                    </button>
                  }
                >
                  {close => (
                    <>
                      <VideoList isDark={isDarkMode} className="filter">
                        <div className="btn-cont">
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => close()}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                        <div className="ok">{filterTop()}</div>
                      </VideoList>
                    </>
                  )}
                </Popup>
                {/*  */}

                <Popup
                  modal
                  trigger={
                    <button type="button">
                      <SvgIcon isDark={isDarkMode}>
                        <FiLogOut className="header-icons" />
                      </SvgIcon>
                    </button>
                  }
                >
                  {close => (
                    <>
                      <ChangeTheme
                        className="pop-up-container"
                        isDark={isDarkMode}
                      >
                        <p>Are you sure, you want to logout?</p>
                        <div className="logout-btn-cont">
                          <CancelBtn
                            type="button"
                            className="trigger-button"
                            isDark={isDarkMode}
                            onClick={() => close()}
                          >
                            Cancel
                          </CancelBtn>
                          <button type="button" onClick={onClickLogout}>
                            Confirm
                          </button>
                        </div>
                      </ChangeTheme>
                    </>
                  )}
                </Popup>
              </div>
              <div className="desktop-icons">
                <button type="button" onClick={toggleTheme}>
                  {!isDarkMode ? (
                    <IoMoon className="header-icons" />
                  ) : (
                    <IoSunnyOutline className="header-icons color-white" />
                  )}
                </button>
                <button type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-image"
                  />
                </button>
                <Popup
                  modal
                  trigger={
                    <button className="logout-btn" type="button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <>
                      <ChangeTheme
                        className="pop-up-container"
                        isDark={isDarkMode}
                      >
                        <p>Are you sure, you want to logout?</p>
                        <div className="logout-btn-cont">
                          <CancelBtn
                            type="button"
                            className="trigger-button"
                            isDark={isDarkMode}
                            onClick={() => close()}
                          >
                            Cancel
                          </CancelBtn>
                          <button type="button" onClick={onClickLogout}>
                            Confirm
                          </button>
                        </div>
                      </ChangeTheme>
                    </>
                  )}
                </Popup>
              </div>
              {/* <SideBar id="navbar" className="navbar-open" isDark={isDarkMode}>
                <p onClick={onClickMenu}>
                  <Link to="/" className="link">
                    Home
                  </Link>
                </p>
                <p onClick={onClickMenu}>
                  <Link to="/trending" className="link">
                    Trending
                  </Link>
                </p>
                <p onClick={onClickMenu}>
                  <Link to="/gaming" className="link">
                    Gaming
                  </Link>
                </p>
                <p onClick={onClickMenu}>
                  <Link to="/saved-videos" className="link">
                    Saved Videos
                  </Link>
                </p>
              </SideBar> */}
            </nav>
          </ChangeTheme>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
