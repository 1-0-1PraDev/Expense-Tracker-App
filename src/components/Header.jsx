import React from 'react';
import styled from 'styled-components';

const Header = ({ theme, setAppTheme }) => {
  return (
    <HeaderDiv>
        <Navigation>
            <Logo>ExpenZ</Logo>
            <ThemeToggler>
               <button onClick={() => setAppTheme((prevTheme) => prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme')}>
                    {theme === 'light-theme' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i> }
                <span>
                    </span>
                    &nbsp;
                    {theme === 'light-theme' ? 'Dark Theme' : 'Light Theme'}
               </button>
            </ThemeToggler>
        </Navigation>
    </HeaderDiv>
  )
}   

const HeaderDiv = styled.div`
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 0.16rem solid var(--border-bg-clr);
`;

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.h1``;
const ThemeToggler = styled.div`
    display: flex;
`;

export default Header;