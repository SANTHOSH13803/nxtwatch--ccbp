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
            <ChangeThemeVideoSection isDark={isDarkMode}>
              <Header />
              <div className="result-container">
                <FilterSection activeTab="Home" />
                <div className="display-according-section">
                  <HomeVideoSection />
                </div>
              </div>
            </ChangeThemeVideoSection>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
