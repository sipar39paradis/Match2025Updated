import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../images/logo/impots-match-logo.svg';

export function TaxDeclarationReview() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <h1>Questionnaire et dépôt des fichiers complétés</h1>
      <p className="font-semibold mb-2 text-justify">
        Votre questionnaire et vos pièces justificatives ont été envoyés à notre
        équipe administrative et vous recevrez par la suite un courriel
        d&apos;invitation à joindre notre portail.
      </p>
      <p className="font-semibold mb-2 text-justify">
        Ce portail nous permettra de vous envoyer les documents de procuration
        qui seront à signer de façon électronique et qui nous permettrons de
        traiter votre dossier.
      </p>
      <p className="font-semibold mb-2 text-justify">
        Merci de faire confiance à Impôts Match!
      </p>
      <input
        type="submit"
        value="Retour à mon compte"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4 absolute bottom-0"
        onClick={() => {
          navigate('/profile');
        }}
      />
      <div className="flex justify-end">
        <Logo className="h-32 self-end" />
      </div>
    </div>
  );
}
