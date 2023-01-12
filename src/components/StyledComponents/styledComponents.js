import Styled from 'styled-components'

export const ChangeTheme = Styled.div`
background-color: ${props => (props.isDark ? '#212121' : '#ffffff')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
transition: 1s;
`
export const VideoList = Styled.div` 
background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
transition: 1s;
`

export const NoVideosSaved = Styled.div`
background-color: ${props => (props.isDark ? '#0f0f0f ' : ' #f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
transition: 1s;

`
export const CustomIcon = Styled.div`
background-color: ${props => (props.isDark ? '#000000' : '#cbd5e1')} ;
transition: 200ms;
// color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
`
export const HeadingDiv = Styled.div`
background-color: ${props => (props.isDark ? '#424242' : '#ebebeb')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
transition: 300ms;
`
export const ChangeThemeVideoSection = Styled.div`
background-color: ${props => (props.isDark ? ' #181818' : ' #f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
transition: 800ms;
`
// background-color: ${props =>
//   props.isDark
//     ? `${props.isActive ? '#3b82f6' : '#231f20'}`
//     : `${props.isActive ? '#3b82f6' : '#ebebeb'}`} ;
// // color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
// color: ${props =>
//   !props.isDark
//     ? `${props.isActive ? '#2563eb' : '#64748b'}`
//     : `${props.isActive ? '#2563eb' : '#64748b'}`} ;
export const LikesDislikeBtn = Styled.button`
    color : ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
export const SvgIcon = Styled.div`
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
`

export const Label = Styled.label`
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
`
export const Para = Styled.p`
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
`
export const SideBar = Styled.div`
background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
margin:0;
`
export const LoginInputs = Styled.input`
background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
outline:none;
cursor:pointer;

`
// color:${props => (props.isActive ? '#ff0b37 ' : '#1e293b')} ;
export const ActiveIcon = Styled.div`
color:${props =>
  props.isDark
    ? `${props.isActive ? '#ff0b37' : 'white'}`
    : `${props.isActive ? '#ff0b37' : 'inherit'}`} ;

`

export const ActiveText = Styled.p`
color:${props =>
  props.isDark
    ? `${props.isActive ? '#ff0b37' : 'white'}`
    : `${props.isActive ? '#ff0b37' : 'inherit'}`} ;
font-weight:${props => (props.isActive ? 'bold' : 'normal')} ;
`
export const ActiveItem = Styled.li`
color:inherit;
background-color: ${props =>
  props.isDark
    ? `${props.isActive ? '#383838' : ''}`
    : `${props.isActive ? ' #d7dfe9' : 'transparent'}`} ;
// background-color: ${props => (props.isActive ? '#d7dfe9' : 'transparent')} ;

cursor:pointer;
`

export const CancelBtn = Styled.button`
border : ${props =>
  props.isDark ? '1px solid #ffffff' : '1px solid #181818'} ;
  color : ${props => (props.isDark ? '#ffffff' : '#181818')} ;
`
export const SearchBar = Styled.div`
border : ${props =>
  props.isDark ? '1px solid #f9f9f9' : '1px solid #181818'} ;
border-radius : ${props => (props.isDark ? '5px' : '5px')} ;
  color : ${props => (props.isDark ? '#ffffff' : '#181818')} ;
  
`
export const SearchBarInput = Styled.input`
background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')} ;
color:${props => (!props.isDark ? '#0f0f0f ' : ' #f9f9f9 ')} ;
outline:none;
border-top-right-radius:0;
border-bottom-right-radius:0;
cursor:pointer;

`
