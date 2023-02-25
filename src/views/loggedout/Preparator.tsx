import Fade from 'react-reveal';
import React from 'react';

export function Preparator() {
  return (
    <section className="relative z-40 overflow-hidden pb-24 sm:pt-36 lg:pt-[170px] lg:pb-[240px]  px-48">
      <Fade top>
        <h1>Être un préparateur partenaire Impôts Match c’est...</h1>
      </Fade>
      <div className="grid grid-cols-2 gap-8">
        <Fade left cascade>
          <ul className="space-y-1 list-disc dark:text-gray-400 mt-12">
            <li className="py-2">
              <p className="font-semibold">Faire votre propre horaire</p>
            </li>
            <li className="py-2">
              <p className="font-semibold">
                Avoir une quantité de dossiers variable et selon vos capacités
              </p>
            </li>
            <li className="py-2">
              <p className="font-semibold">Accès à Ifirm Taxprep inclus</p>
            </li>
            <li>
              <p className="font-semibold">Les dossiers sont clés en main</p>
            </li>
            <li className="py-2">
              <p className="font-semibold">
                Notre équipe administrative s’occupe de : création des fiches
                clients, signature des procurations, importation des feuillets
                des gouvernements et révision des dossiers
              </p>
            </li>
            <li className="py-2">
              <p className="font-semibold">
                Il ne vous reste qu’à rentrer les données non importables et à
                réviser l’importation
              </p>
            </li>
            <li className="py-2">
              <p className="font-semibold">
                Taux horaire variable en fonction de la productivité et
                efficacité mais peut varier entre 60$ et 80$ de l’heure
              </p>
            </li>
            <li className="py-2">
              <p className="font-semibold">
                Cela vous intéresse? Entrez en contact avec{' '}
                <a
                  className="hover:cursor-pointer text-orange-500"
                  href="/#support"
                >
                  nous
                </a>
              </p>
            </li>
          </ul>
        </Fade>
        <Fade right>
          <img
            className="h-[450px] object-cover w-[450px] ml-16"
            src={require('../../images/prepator/preparator-2.jpg')}
            alt="hero-image"
          />
        </Fade>
      </div>
    </section>
  );
}
