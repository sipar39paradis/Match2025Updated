/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext, useEffect } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModal, AuthModalEnum } from '../auth/AuthModal';
import '../../style/sticky.css';
import { ProfileDropdown } from './ProfileDropdown';
import { Button, Navbar } from 'flowbite-react';
import { ReactComponent as Logo } from '../../images/logo/impots-match-logo.svg';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
// import { redirect } from "react-router-dom";

interface HeaderItemProps {
  text: string;
  toLink: string;
}

function HeaderItem(props: HeaderItemProps) {
  return (
    <Link
      to={props.toLink}
      className="sm:text-xs lg:text-base menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-orange-500 [&.active]:text-orange-500 dark:hover:text-white hover:cursor-pointer"
    >
      {props.text}
    </Link>
  );
}

export function Header() {
  const navigate = useNavigate();
  // const  = redirect();
  const { user } = useContext(AppContext) as AppContextType;

  const [showModal, setShowModal] = React.useState(false);
  const [modalToDisplay, setModalToDisplay] =
    React.useState<AuthModalEnum | null>(null);

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
        className="header top-0 left-0 w-full relative lg:px-32"
      >
        <Navbar.Brand href="/">
          <Logo className="w-12 h-12 mr-2" />
          <p className="text-2xl hidden 2xl:inline font-bold text-gray-900">
            Impôts Match
          </p>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user && <ProfileDropdown user={user} displayModal={displayModal} />}
          {!user && (
            <>
              <Button
                onClick={() => displayModal(AuthModalEnum.SignIn)}
                className="mr-2"
              >
                <span className="text-xs 2xl:text-base">Se connecter</span>
              </Button>

              <Button
                color={'dark'}
                onClick={() => displayModal(AuthModalEnum.SignUp)}
                className="mr-2"
              >
                <span className="text-xs 2xl:text-base">S&apos;inscrire</span>
              </Button>
            </>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <>
            <HeaderItem text="Accueil" toLink="/#home" />
            <HeaderItem text="Avantages" toLink="/#advantages" />
            <HeaderItem text="Fonctionnement" toLink="/#features" />
            <HeaderItem text="À propos" toLink="#about" />
            <HeaderItem text="Préparateur" toLink="/preparator" />
            <HeaderItem text={'Nous joindre'} toLink="/#support" />
            {user ? (
              <a
                className="sm:text-xs 2xl:text-base menu-scroll inline-flex items-center justify-center text-center font-heading text-base text-dark-text hover:text-orange-500 [&.active]:text-orange-500 hover:cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                Mon Compte
              </a>
            ) : null}
          </>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
