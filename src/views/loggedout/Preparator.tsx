
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export function Preparator() {
  return (
    <section className="relative z-40 overflow-hidden pb-24 sm:pt-36 lg:pt-[170px] lg:pb-[240px] lg:px-48  px-5">
      <div>
        <h1 className="text-3xl">
          Être un préparateur partenaire Impôts Match c’est...
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div>
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
                Cela vous intéresse? Entrez en contact avec{' '}
                <Link
                  className="hover:cursor-pointer text-orange-500"
                  to="/#support"
                >
                  nous
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div>
          <img
            className="h-[450px] object-cover w-[450px] ml-16 hidden lg:block rounded-md"
            src={require('../../images/prepator/preparator-2.jpg')}
            alt="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
