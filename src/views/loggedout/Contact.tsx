import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from '../../components/auth/AuthModal'; // Ensure correct path

export function Contact() {
  // Retrieve modal functions from AppContext
  const { setModalToDisplay, setShowModal } = useContext(AppContext) as AppContextType;

  // Function to open the modal
  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal);
    setShowModal(true);
  }

  return (
    <section id="cta" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <div>
        <div className="px-4 xl:container m-auto">
          <div
            className="wow fadeInUp relative overflow-hidden bg-cover bg-center py-[60px] px-10 drop-shadow-light dark:drop-shadow-none sm:px-[70px]"
            data-wow-delay=".2s"
          >
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center opacity-10 dark:opacity-40 bg-noise-pattern"></div>
            <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
              <svg
                width="1215"
                height="259"
                viewBox="0 0 1215 259"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" filter="url(#filter0_f_63_363)">
                  <rect
                    x="450"
                    y="189"
                    width="315"
                    height="378"
                    fill="url(#paint0_linear_63_363)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_63_363"
                    x="0"
                    y="-261"
                    width="1215"
                    height="1278"
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
                      result="effect1_foregroundBlur_63_363"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_63_363"
                    x1="420.718"
                    y1="263.543"
                    x2="585.338"
                    y2="628.947"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9D7A" />
                    <stop offset="0.859375" stopColor="#FF5A1F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* New content */}
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-2/3">
                <div className="mx-auto mb-10 max-w-[550px] text-center lg:ml-0 lg:mb-0 lg:text-left">
                  <h2 className="mb-4 font-heading text-xl font-semibold leading-tight text-dark dark:text-white sm:text-[38px]">
                    Service pour particuliers et entreprises
                  </h2>
                  <p className="text-base text-dark-text">
                    Particuliers ou entreprises, un comptable CPA prend en charge votre déclaration et maximise votre retour.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/3">
                <div className="text-center lg:text-right">
                  <button
                    onClick={() => displayModal(AuthModalEnum.SignUp)}
                    className="inline-flex items-center rounded bg-orange-500 py-[14px] px-8 font-heading text-base text-white hover:bg-opacity-90"
                  >
                    Débutez maintenant
                  </button>
                </div>
              </div>
            </div>

            {/* Old version in comment */}
            {/*
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-2/3">
                <div className="mx-auto mb-10 max-w-[550px] text-center lg:ml-0 lg:mb-0 lg:text-left">
                  <h2 className="mb-4 font-heading text-xl font-semibold leading-tight text-dark dark:text-white sm:text-[38px]">
                    Intéressé à joindre notre équipe
                  </h2>
                  <p className="text-base text-dark-text">
                    Si vous êtes un préparateur d’expérience et voulez
                    participer au succès d’Impôts Match, nous avons aussi une
                    offre intéressante pour vous!
                  </p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/3">
                <div
                  className="text-center lg:text-right"
                  onClick={() => navigate('/preparator')}
                >
                  <a
                    href="javascript:void(0)"
                    className="inline-flex items-center rounded bg-orange-500 py-[14px] px-8 font-heading text-base text-white hover:bg-opacity-90"
                  >
                    Plus d&apos;information
                  </a>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
