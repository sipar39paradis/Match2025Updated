/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext, useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModal, AuthModalEnum } from '../auth/AuthModal';
import '../../style/sticky.css';
import { ProfileDropdown } from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { Button, Navbar } from 'flowbite-react';
// import { ReactComponent as Logo } from '../../images/logo/impots-match-logo.svg';
import { ReactComponent as Logo } from '../../images/logo/impots-match-logo.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface HeaderItemProps {
  text: string;
  toLink: string;
}

function HeaderItem(props: HeaderItemProps) {
  const navigate = useNavigate();
  return (

      <a
        onClick={() => {
          navigate(props.toLink);
        }}
        className="sm:text-xs lg:text-base menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-orange-500 [&.active]:text-orange-500 dark:hover:text-white"
      >
        {props.text}
      </a>

  );
}

export function Header() {
  const { user } = useContext(AppContext) as AppContextType;
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();

  const [showModal, setShowModal] = React.useState(false);
  const [modalToDisplay, setModalToDisplay] =
    React.useState<AuthModalEnum | null>(null);

  const [activeLink, setActiveLink] = useState('home');
  const [hover, setHover] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavBar);
    return () => window.removeEventListener('scroll', stickNavBar);
  }, []);

  function stickNavBar() {
    const ud_header: HTMLElement = document.querySelector('.header');
    const sticky = ud_header.offsetTop;

    if (window.pageYOffset > sticky) {
      ud_header.classList.add('sticky');
    } else {
      ud_header.classList.remove('sticky');
    }
  }

  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal);
    setShowModal(true);
  }

  return (
    <>
      {/* {showModal && modalToDisplay && (
        <AuthModal
          authModalToDisplay={modalToDisplay}
          closeModal={setShowModal}
          switchModal={setModalToDisplay}
        ></AuthModal>
      )}
      <header className="header absolute top-0 left-0 w-full bg-white">
        <div className="flex w-full flex-wrap px-5 lg:flex-nowrap lg:items-center lg:px-5 xl:px-10 2xl:px-20 h-16">
          <div className="relative z-[99] max-w-[250px] lg:w-full xl:max-w-[350px]">
            <a className="inline-block">
              <img
                src={require('../../images/logo/logo-dark.svg').default}
                alt="logo"
                className="hidden h-[50px] dark:block"
              />
              <img
                src={require('../../images/logo/impot-match-logo.svg').default}
                alt="logo"
                className="h-[96px] dark:hidden cursor-pointer"
                onClick={() => {
                  navigate('/');
                  window.scroll({
                    top: 0,
                    left: 0,
                  });
                }}
              />
            </a>
          </div>
          <div className="flex items-center menu-wrapper fixed top-0 left-0 z-50 h-screen w-full justify-center p-5 dark:bg-dark lg:visible lg:static lg:flex lg:h-auto lg:justify-start lg:bg-transparent lg:p-0 lg:opacity-100 dark:lg:bg-transparent">
            <div className="w-full self-center">
              <nav>
                <ul className="navbar flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-start lg:space-x-10 lg:space-y-0">
                  <HeaderItem text="Accueil" toLink="/#home" />
                  <HeaderItem text="Comment ça marche" toLink="/#features" />
                  <HeaderItem text="Avantages" toLink="/#advantages" />
                  <HeaderItem text="À propos de nous" toLink="/#about" />
                  <HeaderItem text="Préparateur" toLink="/preparator" />
                  <HeaderItem text={'Nous joindre'} toLink="/#support" />
                </ul>
              </nav>
            </div>
            {user && <ProfileDropdown user={user} displayModal={displayModal} />}
            {!user && (
              <div className="absolute bottom-0 left-0 flex w-full items-center justify-between space-x-5 self-end p-5 lg:static lg:w-auto lg:self-center lg:p-0">
                <button
                  onClick={() => displayModal(AuthModalEnum.SignIn)}
                  className="w-full whitespace-nowrap rounded bg-orange-500 py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => displayModal(AuthModalEnum.SignUp)}
                  className="w-full whitespace-nowrap rounded bg-[#222C40] py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto"
                >
                  S&apos;inscrire
                </button>
              </div>
            )}
          </div>
        </div>
      </header> */}
      {showModal && modalToDisplay && (
        <AuthModal
          authModalToDisplay={modalToDisplay}
          closeModal={setShowModal}
          switchModal={setModalToDisplay}
        ></AuthModal>
      )}
      <Navbar
        fluid={true}
        rounded={true}
        className="header top-0 left-0 w-full relative"
      >
        <Navbar.Brand href="/">
          <Logo className="w-16 h-16" />
          {width > 1200 ? (
            <p className="text-2xl font-bold text-gray-900">Impôts Match</p>
          ) : null}

          {width < 740 ? <p className="text-xl font-bold text-gray-900">Impôts Match</p>:null}

        </Navbar.Brand>
        <div className="flex md:order-2">
          {user && <ProfileDropdown user={user} displayModal={displayModal} />}
          {!user && ( 
            // <div className="absolute bottom-0 left-0 flex w-full items-center justify-between space-x-5 self-end p-5 lg:static lg:w-auto lg:self-center lg:p-0">
              <>

              <Button size="xs"
              onClick={() => displayModal(AuthModalEnum.SignIn)}>
                Se connecter
              </Button>
              
              <Button size="xs"
              color={'dark'}
              onClick={() => displayModal(AuthModalEnum.SignUp)}>
                S&apos;inscrire
              </Button>

              </>
            // </div>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <>
            <HeaderItem text="Accueil" toLink="/#home" />
            <HeaderItem text="Comment ça marche" toLink="/#features" />
            <HeaderItem text="Avantages" toLink="/#advantages" />
            <HeaderItem text="À propos de nous" toLink="/#about" />
            <HeaderItem text="Préparateur" toLink="/preparator" />
            <HeaderItem text={'Nous joindre'} toLink="/#support" />
            {/* <button
                onClick={() => displayModal(AuthModalEnum.SignIn)}
                className=" w-auto whitespace-nowrap rounded bg-orange-500 py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto"
              >
                Se connecter
              </button>
              <button
                onClick={() => displayModal(AuthModalEnum.SignUp)}
                className="w-fit whitespace-nowrap rounded bg-[#222C40] py-3 px-6 text-center font-heading text-white hover:bg-opacity-90 lg:w-auto"
              >
                S&apos;inscrire
              </button> */}
            

            {user ? (
              // <a
              //   className="menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-orange-500 [&.active]:text-orange-500 dark:hover:text-white cursor-pointer"
              //   onClick={() => {
              //     setActiveLink('files');
              //     navigate('/profile');
              //   }}
              // >
              //   Mon Compte
              // </a>
              <HeaderItem text={'Mon Compte'} toLink="/profile" />
            ) : null}
          </>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
