import {Component} from 'react'
import './index.css'

import Header from '../Header'
import {ChangeThemeVideoSection} from '../StyledComponents/styledComponents'
import ThemeContext from '../../Context/context'

import HomeVideoSection from '../Videos'
// import TrendingSection from '../TrendingSection'
import FilterSection from '../FilterSection'

class Home extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div>
              <Header />
              <div className="result-container">
                <FilterSection activeTab="Home" />
                <ChangeThemeVideoSection
                  className="display-according-section"
                  isDark={isDarkMode}
                  data-testid="home"
                >
                  <HomeVideoSection />
                </ChangeThemeVideoSection>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
