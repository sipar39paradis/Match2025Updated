import React from 'react';
import Fade from 'react-reveal';

export function About() {
  return (
    <section
      id="about"
      className="pt-14 sm:pt-20 lg:pt-[130px] animate__animated animate__bounceInLeft"
    >
      <Fade bottom cascade>
        <div className="px-4 xl:container m-auto">
          {/* <!-- Section Title --> */}
          <div className="relative mx-auto mb-12 pt-6 text-center lg:mb-20 lg:pt-16">
            <h2 className="mx-auto mb-5 max-w-[570px] font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px]">
              A propos de nous
            </h2>
          </div>

          <div className="relative z-10 overflow-hidden rounded px-8 pt-0 pb-8 md:px-[70px] md:pb-[70px] lg:px-[60px] lg:pb-[60px] xl:px-[70px] xl:pb-[70px]">
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center opacity-10 dark:opacity-40 bg-noise-pattern"></div>
            <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
              <svg
                width="1174"
                height="560"
                viewBox="0 0 1174 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4" filter="url(#filter0_f_41_257)">
                  <rect
                    x="450.531"
                    y="279"
                    width="272.933"
                    height="328.051"
                    fill="url(#paint0_linear_41_257)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_41_257"
                    x="0.531494"
                    y="-171"
                    width="1172.93"
                    height="1228.05"
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
                      result="effect1_foregroundBlur_41_257"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_41_257"
                    x1="425.16"
                    y1="343.693"
                    x2="568.181"
                    y2="660.639"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9D7A" />
                    <stop offset="0.859375" stopColor="#FF5A1F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-full">
              <div className="tabPanel">
                <div className="-mx-4 flex flex-wrap items-center pt-[70px]">
                  <div className="w-full px-4 lg:w-1/2">
                    <div className="relative z-30 mb-14 h-[490px] max-w-[600px] lg:mb-0">
                      <div className="absolute left-0 top-0">
                        <img
                          src={require('../../images/about/image-1.jpg')}
                          alt="about-image"
                        />
                      </div>
                      <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
                        <img
                          src={require('../../images/about/image-2.jpg')}
                          alt="about-image"
                        />
                        <div className="absolute -left-5 -top-5 -z-10 h-full w-full border border-orange-500 border-opacity-10 bg-orange-500 bg-opacity-5 backdrop-blur-[6px] dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10"></div>
                      </div>
                      <div className="absolute right-0 top-24 z-40">
                        <svg
                          width="72"
                          height="38"
                          viewBox="0 0 72 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M62.0035 2.04985C59.6808 1.76671 57.4524 2.70929 55.1508 4.68209C51.3631 7.92863 44.7908 9.54366 38.8668 4.69678C36.329 2.6204 34.117 2.29213 32.2894 2.59672C30.3972 2.91209 28.8057 3.92088 27.5547 4.75487C25.5734 6.07577 23.3915 7.46379 20.8786 7.78953C18.2847 8.12577 15.515 7.32034 12.3598 4.69105C9.71804 2.48955 7.45748 2.0661 5.72104 2.33325C3.94436 2.6066 2.56003 3.6273 1.76341 4.56877C1.40666 4.99037 0.775686 5.04295 0.354079 4.68621C-0.0675277 4.32946 -0.120109 3.69849 0.236635 3.27688C1.27334 2.05168 3.0643 0.71846 5.41692 0.356509C7.80979 -0.0116349 10.6326 0.648246 13.6402 3.1546C16.485 5.52529 18.7154 6.05321 20.6215 5.80612C22.6086 5.54854 24.4266 4.43657 26.4453 3.09078L27 3.92282L26.4453 3.09078C27.6943 2.25809 29.6028 1.0169 31.9606 0.623935C34.383 0.220203 37.1711 0.725274 40.1333 3.14886C45.1548 7.25733 50.6369 5.9169 53.8492 3.16356C56.3795 0.994798 59.1512 -0.312658 62.2455 0.0645503C65.3089 0.43799 68.4333 2.43425 71.7557 6.26783C72.1174 6.68518 72.0723 7.31674 71.655 7.67845C71.2376 8.04015 70.606 7.99504 70.2443 7.57769C67.0668 3.91125 64.3571 2.33677 62.0035 2.04985Z"
                            fill="#FF5A1F"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M62.0035 11.9727C59.6808 11.6896 57.4524 12.6321 55.1508 14.6049C51.3631 17.8515 44.7908 19.4665 38.8668 14.6196C36.329 12.5433 34.117 12.215 32.2894 12.5196C30.3972 12.8349 28.8057 13.8437 27.5547 14.6777C25.5734 15.9986 23.3915 17.3866 20.8786 17.7124C18.2847 18.0486 15.515 17.2432 12.3598 14.6139C9.71804 12.4124 7.45748 11.989 5.72104 12.2561C3.94436 12.5294 2.56003 13.5501 1.76341 14.4916C1.40666 14.9132 0.775686 14.9658 0.354079 14.6091C-0.0675277 14.2523 -0.120109 13.6213 0.236635 13.1997C1.27334 11.9745 3.0643 10.6413 5.41692 10.2794C7.80979 9.91122 10.6326 10.5711 13.6402 13.0775C16.485 15.4481 18.7154 15.9761 20.6215 15.729C22.6086 15.4714 24.4266 14.3594 26.4453 13.0136L27 13.8457L26.4453 13.0136C27.6943 12.1809 29.6028 10.9397 31.9606 10.5468C34.383 10.1431 37.1711 10.6481 40.1333 13.0717C45.1548 17.1802 50.6369 15.8397 53.8492 13.0864C56.3795 10.9176 59.1512 9.61019 62.2455 9.9874C65.3089 10.3608 68.4333 12.3571 71.7557 16.1907C72.1174 16.608 72.0723 17.2396 71.655 17.6013C71.2376 17.963 70.606 17.9179 70.2443 17.5005C67.0668 13.8341 64.3571 12.2596 62.0035 11.9727Z"
                            fill="#FF5A1F"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M62.0035 21.8953C59.6808 21.6122 57.4524 22.5548 55.1508 24.5275C51.3631 27.7741 44.7908 29.3891 38.8668 24.5422C36.329 22.4659 34.117 22.1376 32.2894 22.4422C30.3972 22.7575 28.8057 23.7663 27.5547 24.6003C25.5734 25.9212 23.3915 27.3093 20.8786 27.635C18.2847 27.9712 15.515 27.1658 12.3598 24.5365C9.71804 22.335 7.45748 21.9116 5.72104 22.1787C3.94436 22.4521 2.56003 23.4728 1.76341 24.4142C1.40666 24.8358 0.775686 24.8884 0.354079 24.5317C-0.0675277 24.1749 -0.120109 23.5439 0.236635 23.1223C1.27334 21.8971 3.0643 20.5639 5.41692 20.202C7.80979 19.8338 10.6326 20.4937 13.6402 23.0001C16.485 25.3707 18.7154 25.8987 20.6215 25.6516C22.6086 25.394 24.4266 24.282 26.4453 22.9362L27 23.7683L26.4453 22.9362C27.6943 22.1035 29.6028 20.8624 31.9606 20.4694C34.383 20.0657 37.1711 20.5707 40.1333 22.9943C45.1548 27.1028 50.6369 25.7624 53.8492 23.009C56.3795 20.8403 59.1512 19.5328 62.2455 19.91C65.3089 20.2834 68.4333 22.2797 71.7557 26.1133C72.1174 26.5306 72.0723 27.1622 71.655 27.5239C71.2376 27.8856 70.606 27.8405 70.2443 27.4231C67.0668 23.7567 64.3571 22.1822 62.0035 21.8953Z"
                            fill="#FF5A1F"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M62.0035 31.8182C59.6808 31.535 57.4524 32.4776 55.1508 34.4504C51.3631 37.6969 44.7908 39.312 38.8668 34.4651C36.329 32.3887 34.117 32.0604 32.2894 32.365C30.3972 32.6804 28.8057 33.6892 27.5547 34.5232C25.5734 35.8441 23.3915 37.2321 20.8786 37.5578C18.2847 37.8941 15.515 37.0887 12.3598 34.4594C9.71804 32.2579 7.45748 31.8344 5.72104 32.1016C3.94436 32.3749 2.56003 33.3956 1.76341 34.3371C1.40666 34.7587 0.775686 34.8113 0.354079 34.4545C-0.0675277 34.0978 -0.120109 33.4668 0.236635 33.0452C1.27334 31.82 3.0643 30.4868 5.41692 30.1248C7.80979 29.7567 10.6326 30.4166 13.6402 32.9229C16.485 35.2936 18.7154 35.8215 20.6215 35.5744C22.6086 35.3169 24.4266 34.2049 26.4453 32.8591L27 33.6911L26.4453 32.8591C27.6943 32.0264 29.6028 30.7852 31.9606 30.3922C34.383 29.9885 37.1711 30.4936 40.1333 32.9172C45.1548 37.0256 50.6369 35.6852 53.8492 32.9319C56.3795 30.7631 59.1512 29.4557 62.2455 29.8329C65.3089 30.2063 68.4333 32.2026 71.7557 36.0361C72.1174 36.4535 72.0723 37.085 71.655 37.4468C71.2376 37.8085 70.606 37.7634 70.2443 37.346C67.0668 33.6796 64.3571 32.1051 62.0035 31.8182Z"
                            fill="#FF5A1F"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-1/2">
                    <div className="max-w-[565px] lg:ml-auto">
                      <p className="mb-6 text-base text-dark-text">
                        Impôts Match est la première plateforme 100% en ligne
                        pour la préparation des déclarations d’impôts qui offre
                        un service rapide et de qualité via nos préparateurs
                        compétents et dévoués.
                      </p>
                      <p className="mb-6 text-base text-dark-text">
                        Vous serez accompagné par la plateforme à travers le
                        processus concis qui nous permettra de recueillir vos
                        informations. Le tout dans un environnement confidentiel
                        et sécuritaire.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}
