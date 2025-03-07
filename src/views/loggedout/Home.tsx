import React, { useContext } from 'react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from '../../components/auth/AuthModal'; 

export function Home() {
  // Retrieve modal functions from AppContext
  const { setModalToDisplay, setShowModal } = useContext(AppContext) as AppContextType;

  // Function to open the modal
  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal);
    setShowModal(true);
  }

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pb-24 lg:pt-16 lg:pb-[240px]"
      >
        <div className="px-4 xl:container m-auto">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-3 lg:w-1/2">
              <div>
                <div className="mx-auto mb-12 max-w-[530px] text-center lg:ml-0 lg:mb-0 lg:text-left">
                  <span className="mb-8 hidden lg:inline-block rounded-full bg-orange-500 bg-opacity-5 py-[10px] px-5 font-heading text-base text-orange-500 dark:bg-white dark:bg-opacity-10 dark:text-white">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                    Vos impôts méritent un vrai pro
                  </span>
                  <h1 className="mb-5 font-heading text-2xl font-semibold dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px]">
                    Impôts Match
                  </h1>
                  <p className="mb-12 text-base text-dark-text text-left px-8 md:px-0 max-w-[400px]">
                    Vos impôts, entre les mains d&apos;un comptable CPA qui sait comment maximiser votre retour. Parce que votre argent et votre temps comptent.
                  </p>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Button href="#features" className="!bg-orange-500">
                      <span>Fonctionnement</span>
                      <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    {/* Sign-up button triggers modal */}
                    <Button color={'dark'} className="ml-4" onClick={() => displayModal(AuthModalEnum.SignUp)}>
                      <span>Maximisez votre retour</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="w-full px-4 lg:w-1/2">
              <div>
                <div className="relative z-30 mx-auto h-[360px] md:h-[560px] w-full max-w-[700px] lg:ml-0">
                  <div className="absolute top-0 right-0 lg:w-11/12">
                    <img
                      src={require('../../images/hero/image-2.jpg')}
                      alt="hero-image"
                      className="h-[520px] w-[560] object-cover rounded-md"
                    />
                  </div>

                  {/* OVERLAY BOX */}
                  <div className="absolute bottom-[100px] left-10 z-50 rounded-lg bg-orange-500 bg-opacity-90 px-12 py-8 text-white shadow-lg w-[350px]">
                    <span className="text-4xl font-bold leading-tight">À partir de</span>
                    <span className="block text-9xl font-extrabold leading-none">99$</span>
                  </div>

                  {/* Second Image */}
                  <div className="absolute left-[-120px] bottom-[-144px] z-10 lg:block hidden">
                    <img
                      src={require('../../images/hero/image-1.jpg')}
                      alt="hero-image"
                      className="h-[420px] w-[440px] object-cover rounded-md"
                    />
                    <div className="absolute -top-6 -right-6 -z-10 h-full w-full border border-orange-500 border-opacity-10 bg-orange-500 bg-opacity-5 backdrop-blur-[6px] dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND EFFECTS */}
        <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-cover bg-center opacity-10 dark:opacity-40 bg-noise-pattern"></div>
        <div className="absolute top-0 right-0 -z-10">
          <svg
            width="1356"
            height="860"
            viewBox="0 0 1356 860"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-z-10"
          >
            <g opacity="0.5" filter="url(#filter0_f_201_2181)">
              <rect
                x="450.088"
                y="-126.709"
                width="351.515"
                height="944.108"
                transform="rotate(-34.6784 450.088 -126.709)"
                fill="url(#paint0_linear_201_2181)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_201_2181"
                x="0.0878906"
                y="-776.711"
                width="1726.24"
                height="1876.4"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="225"
                  result="effect1_foregroundBlur_201_2181"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}
