import React, { useRef } from 'react';
import Fade from 'react-reveal';
import emailjs from '@emailjs/browser';

export function Support() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_6bjauir',
        'template_q6vh61j',
        form.current,
        'umJYlsZZcSc4v8_4L'
      )
      .then(() => {
        alert('Email sent.');
      })
      .catch((err) => {
        alert('There was an issue.');
        console.log(err);
      });
  };

  return (
    <section id="support" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <Fade top cascade>
        <div className="px-4 xl:container m-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 xl:w-10/12">
              <div className="flex flex-wrap items-center border-b pb-14 dark:border-[#2E333D] lg:pb-0">
                <div className="w-full px-4 mx-auto">
                  {/* <!-- Section Title --> */}
                  <div className="relative mb-12 max-w-[500px] pt-6 md:mb-14 lg:pt-16">
                    <span className="title !left-0 !translate-x-0">
                      SUPPORT
                    </span>
                    <h2 className="mb-5 font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px]">
                      Besoin d&apos;aide? Envoyez nous un message!
                    </h2>
                    <p className="text-base text-dark-text">
                      Notre équipe de professionnelles ce fera un plaisir de
                      répondre à vos questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[780px] pt-[130px]">
            <form ref={form} onSubmit={sendEmail}>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 sm:w-1/2">
                  <div className="mb-12">
                    <label
                      htmlFor="name"
                      className="mb-3 block font-heading text-base text-dark dark:text-white"
                    >
                      Votre nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Votre nom"
                      className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>
                <div className="w-full px-4 sm:w-1/2">
                  <div className="mb-12">
                    <label
                      htmlFor="email"
                      className="mb-3 block font-heading text-base text-dark dark:text-white"
                    >
                      Addresse Courriel
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email@exemple.com"
                      className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>
                <div className="w-full px-4 sm:w-1/2">
                  <div className="mb-12">
                    <label
                      htmlFor="phone"
                      className="mb-3 block font-heading text-base text-dark dark:text-white"
                    >
                      Téléphone (Optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="(xxx) xxx-xxxx"
                      className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>
                <div className="w-full px-4 sm:w-1/2">
                  <div className="mb-12">
                    <label
                      htmlFor="subject"
                      className="mb-3 block font-heading text-base text-dark dark:text-white"
                    >
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Écrivez le sujet"
                      className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="mb-10">
                    <label
                      htmlFor="message"
                      className="mb-3 block font-heading text-base text-dark dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      id="message"
                      placeholder="Écrivez votre Message"
                      className="w-full resize-none border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                    ></textarea>
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="mb-12">
                    <label
                      htmlFor="supportCheckbox"
                      className="flex cursor-pointer select-none text-dark-text hover:text-orange-500"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="supportCheckbox"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border dark:border-[#414652]">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              className="stroke-current"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                strokeWidth="0.4"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      J&apos;ai lu les conditions du service et j&apos;accepte
                      la politique de confidentialité. Politique de
                      confidentialité
                    </label>
                  </div>
                </div>

                <div className="w-full px-4">
                  <input
                    type="submit"
                    value="Envoyez votre message"
                    className="flex w-full items-center justify-center rounded bg-orange-500 py-[14px] px-8 font-heading text-base text-white hover:bg-opacity-90"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </section>
  );
}
