import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const StyledContainer = styled(Container)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 30;
  height: 49px;
  background-color: ${({ theme }) => theme.background.primary};
`;

export const StyledNavbar = styled(Navbar)`
  button.navbar-toggler.collapsed {
    height: 74% !important;
    position: relative;
    top: -6px;
  }
  margin-bottom: 0 !important;
  height: 49px;
  background: ${({ theme }) => theme.background.primary};
  .navbar-toggler.collapsed:f {
    height: 74% !important;
    &:focus {
      box-shadow: none !important;
    }
  }

  @media (min-width: 992px) {
    max-width: 100%;
  }
  display: flex;

  .navbar-collapse {
    justify-content: flex-end;
    @media (max-width: 769px) {
      background: ${({ theme }) => theme.background.primary};
      width: 100%;
      position: fixed;
      top: 49px;
      padding-top: 10px;
      left: 0;
      overflow-y: auto;
    }
  }

  .navbar-nav {
    @media (max-width: 992px) {
      align-items: flex-start;
    }
  }
  .drop-caret.navbar-brand {
    width: 15%;
    min-width: fit-content;
  }
`;

export const Span = styled.span`
  font-size: 16px;
  padding-left: 10px;
  color: ${({ theme }) => theme.color.primary};
  @media (min-width: 770px) {
    display: none;
  }
`;
export const ContainerNav = styled(Container)`
  @media (min-width: 992px) {
    max-width: 100%;
  }
  display: flex;

  .navbar-collapse {
    justify-content: flex-end;
  }

  .navbar-nav {
    @media (max-width: 992px) {
      align-items: flex-start;
    }
  }

  .nav-link {
    display: inherit;
    align-items: center;
  }

  .nav-dropdown .nav-link {
    display: block !important;
  }
`;
export const NavBarContent = styled(Navbar)`
  width: 100%;
  background: ${({ theme }) => theme.background.primary};
  --bs-navbar-toggler-border-color: unset !important;
  .navbar-toggler {
    background: white;
  }

  @media (min-width: 992px) {
    height: 49px;
  }

  .drop-caret {
    width: 17%;
  }
`;

export const AppHeader = styled.header`
  background-color: ${({ theme }) => theme.canvas};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const AppContainer = styled.div`
  text-align: center;
  height: 49px;
`;

// export const MyNav = styled(Nav)`
//   a .nav-link {
//     display: flex !important;
//     align-items: center !important;
//   }
// `;

const GlobalStyle = createGlobalStyle`
 .nav-link {
  display: flex !important;
  align-items: center !important;

  @media (max-width: 768px) {
    margin: 3px 0;
  }
}
`;

export default GlobalStyle;
