import { Button } from 'flowbite-react';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from '../../components/auth/AuthModal';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function PrivacyPolicy() {
  const query = useQuery();
  const navigate = useNavigate();
  const { signUpWithEmailAndPassword, createUserParams, signInWithGoogle, setModalToDisplay, setShowModal, setErr, setDonePolicy } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <div className=" p-16 px-56">
      <h1>Politique de Confidentialité </h1>

      <h2>Introduction</h2>
      <p className=" pb-5">
        {
          "www.impotsmatch.com est une plateforme en ligne qui offre des services professionnels d'assistance fiscale. Nous sommes fiers de nos efforts pour protéger la vie privée de nos utilisateurs et nous sommes déterminés à assurer la protection de leurs informations personnelles. Cette politique de confidentialité a été élaborée pour décrire en détail les types d'informations personnelles que nous collectons, comment nous les utilisons, et comment nous les protégeons. Nous encourageons nos utilisateurs à lire attentivement cette politique pour comprendre comment nous gérons les informations personnelles collectées à travers notre site web."
        }
      </p>

      <h2>{"Types d'informations personnelles collectées"}</h2>
      <p className=" pb-5">
        {
          "Nous collectons différents types d'informations personnelles lorsque vous utilisez nos services. Voici les types d'informations que nous pouvons collecter:"
        }
      </p>

      <h2>Informations de contact</h2>
      <p className=" pb-5">
        {
          'Nous pouvons collecter votre nom complet, votre adresse électronique, votre numéro de téléphone, votre adresse postale et toute autre information de contact nécessaire pour vous fournir nos services.'
        }
      </p>

      <h2>Informations de compte</h2>
      <p className=" pb-5">
        {
          "Pour vous permettre de vous connecter à votre compte sur www.impotsmatch.com, nous pouvons collecter des informations de compte telles que votre nom d'utilisateur et votre mot de passe."
        }
      </p>

      <h2>Informations de navigation</h2>
      <p className=" pb-5">
        {
          "Lorsque vous utilisez notre site web, nous pouvons collecter des informations sur votre utilisation, telles que le type de navigateur que vous utilisez, votre adresse IP, la date et l'heure de votre visite, les pages que vous avez consultées, les téléchargements effectués et les erreurs rencontrées."
        }
      </p>

      <h2>Informations sur les préférences</h2>
      <p className=" pb-5">
        {
          'Nous pouvons collecter des informations sur vos préférences, telles que les services que vous avez sélectionnés, les notifications que vous souhaitez recevoir, et les préférences de confidentialité que vous avez définies.'
        }
      </p>

      <h2>Comment nous utilisons vos informations personnelles</h2>
      <p className=" pb-5">
        {
          'Nous utilisons les informations personnelles que nous collectons à différentes fins. Voici les façons dont nous pouvons utiliser vos informations personnelles:'
        }
      </p>

      <h2>Pour fournir nos services</h2>
      <p className=" pb-5">
        {
          "Nous utilisons vos informations personnelles pour vous fournir les services que vous avez demandés, tels que l'assistance fiscale, la préparation de déclarations de revenus, et d'autres services similaires."
        }
      </p>

      <h2>Pour améliorer nos services</h2>
      <p className=" pb-5">
        {
          'Nous utilisons vos informations personnelles pour améliorer nos services et les adapter à vos besoins. Par exemple, nous pouvons utiliser des informations sur vos préférences pour personnaliser votre expérience sur notre site web.'
        }
      </p>

      <h2>Pour communiquer avec vous</h2>
      <p className=" pb-5">
        {
          'Nous utilisons vos informations de contact pour communiquer avec vous par courrier électronique, téléphone ou courrier postal à des fins administratives ou marketing.'
        }
      </p>

      <h2>Pour protéger nos intérêts légitimes </h2>
      <p className=" pb-5">
        {
          'Nous pouvons utiliser vos informations personnelles pour protéger nos intérêts légitimes, tels que la protection contre la fraude, la protection de nos droits et ceux de nos utilisateurs, et la protection de notre site web et de nos systèmes informatiques.'
        }
      </p>

      <h2>
        {
          "Comment nous protégeons vos informations personnelles Nous prenons de nombreuses mesures de sécurité pour protéger vos informations personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la modification et la divulgation. Voici les mesures de sécurité que nous prenons :"
        }
      </h2>
      <h2>Cryptage</h2>
      <p className=" pb-5">
        {
          "Nous utilisons le cryptage pour protéger les informations sensibles telles que les informations financières lors de leur transmission sur internet. Contrôles d'accès : Nous limitons l'accès à vos informations personnelles aux employés, aux partenaires et aux tiers qui ont besoin de ces informations pour fournir nos services. Sauvegardes de sécurité : Nous effectuons régulièrement des sauvegardes de sécurité de nos systèmes informatiques pour protéger vos informations personnelles contre la perte ou la destruction accidentelle."
        }
      </p>

      <h2>Formation des employés</h2>
      <p className=" pb-5">
        {
          'Nous formons nos employés sur les bonnes pratiques de protection de la vie privée et de la sécurité des informations personnelles.'
        }
      </p>

      <p className=" pb-5">
        Divulgation à des tiers Nous ne vendons, ne louons ni ne partageons vos
        informations personnelles avec des tiers à des fins commerciales sans
        votre consentement explicite. Cependant, nous pouvons divulguer vos
        informations personnelles à des tiers dans les circonstances suivantes:{' '}
      </p>

      <h2>Pour fournir nos services</h2>
      <p className=" pb-5">
        {
          'Nous pouvons divulguer vos informations personnelles à des tiers pour vous fournir les services que vous avez demandés. Par exemple, nous pouvons divulguer vos informations à des experts-comptables pour vous aider à préparer vos déclarations de revenus.'
        }
      </p>

      <h2>Pour respecter les lois et les réglementations</h2>
      <p className=" pb-5">
        {
          'Nous pouvons être tenus de divulguer vos informations personnelles pour respecter les lois, les réglementations, les procédures judiciaires et les ordres du gouvernement.'
        }
      </p>

      <h2>Pour protéger nos intérêts légitimes </h2>
      <p className=" pb-5">
        {
          'Nous pouvons divulguer vos informations personnelles pour protéger nos intérêts légitimes, tels que la protection contre la fraude, la protection de nos droits et ceux de nos utilisateurs, et la protection de notre site web et de nos systèmes informatiques.'
        }
      </p>

      <p className=" pb-5">
        Nous pouvons divulguer vos informations personnelles pour protéger nos
        intérêts légitimes, tels que la protection contre la fraude, la
        protection de nos droits et ceux de nos utilisateurs, et la protection
        de notre site web et de nos systèmes informatiques.
      </p>

      <h2>Mettre à jour vos informations personnelles</h2>
      <p className=" pb-5">
        {
          'Vous pouvez mettre à jour vos informations personnelles en accédant à votre compte sur notre site web. Révoquer votre consentement : Vous pouvez révoquer votre consentement à tout moment en nous contactant à l\'adresse email indiquée dans la section "Nous contacter".'
        }
      </p>

      <h2>Supprimer vos informations personnelles</h2>
      <p className=" pb-5">
        {
          'Vous pouvez demander la suppression de vos informations personnelles en nous contactant à l\'adresse email indiquée dans la section "Nous contacter".'
        }
      </p>

      <p className=" pb-5">
        {
          'Vous pouvez demander la suppression de vos informations personnelles en nous contactant à l\'adresse email indiquée dans la section "Nous contacter".'
        }
      </p>

      <p className=" pb-5">
        Transfert international de vos informations personnelles Nous pouvons
        transférer vos informations personnelles en dehors de votre pays de
        résidence pour stocker et traiter ces informations. Nous prenons des
        mesures pour nous assurer que vos informations personnelles soient
        protégées en conformité avec les lois applicables sur la protection des
        données.
      </p>

      <h2>Modifications de notre politique de confidentialité</h2>
      <p className=" pb-5">
        {
          'Nous pouvons mettre à jour notre politique de confidentialité de temps en temps. Nous vous informerons de tout changement important en publiant une nouvelle version de notre politique de confidentialité sur notre site web.'
        }
      </p>

      <p className=" pb-5">
        {
          "Nous contacter Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à l'adresse suivante : info@impotsmatch.com. Nous ferons de notre mieux pour vous répondre dans les plus brefs délais."
        }
      </p>

      <p className=" pb-5">
        {
          "Si vous pensez que nous avons traité vos informations personnelles de manière inappropriée, vous pouvez également déposer une plainte auprès de l'autorité de protection des données compétente."
        }
      </p>

      <p className=" pb-5">
        Sécurité de vos informations personnelles Nous prenons la sécurité de
        vos informations personnelles très au sérieux et nous mettons en œuvre
        des mesures techniques et organisationnelles pour protéger vos
        informations contre toute perte, utilisation abusive, accès non
        autorisé, modification ou divulgation.
      </p>

      <p className=" pb-5">
        {
          "Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est complètement sûre. Bien que nous fassions de notre mieux pour protéger vos informations personnelles, nous ne pouvons garantir la sécurité absolue de vos informations transmises sur notre site web ou stockées sur nos systèmes."
        }
      </p>

      <p className=" pb-5">
        En utilisant notre site web, vous reconnaissez que vous comprenez les
        risques associés à la transmission de vos informations sur Internet et
        que vous les acceptez.
      </p>

      <p className=" pb-5">
        {
          "En conclusion Nous espérons que cette politique de confidentialité vous aidera à comprendre comment nous utilisons et protégeons vos informations personnelles. Si vous avez des questions, n'hésitez pas à nous contacter."
        }
      </p>

      {query.get('signup') ? (
        <div className="flex flex-col justify-center items-center pt-4 p-4 bg-gray-200 rounded-md">
          <p>
            J’ai lu la politique de confidentialité d’Impôts Match et je l’accepte
          </p>
          <Button
            className="bg-orange-500 p-4 mt-4"
            onClick={async () => {
              setDonePolicy(true)
              if(query.get('type') && query.get('type') === 'email'){
                const err = await signUpWithEmailAndPassword(
                  createUserParams.email,
                  createUserParams.password,
                  createUserParams.firstName,
                  createUserParams.lastName,
                  createUserParams.referralCode
                );
                console.log('testingerr', err)
                if (err) {
                  if(err === 'No Two Factor'){
                    setModalToDisplay(AuthModalEnum.TwoFactor)
                    setShowModal(true)
                    navigate('/profile');
                  }
                  setErr(err)
                  setModalToDisplay(AuthModalEnum.SignUpWithEmail)
                  setShowModal(true)
                } else {
                  navigate('/profile');
                }
              }else if (query.get('type') && query.get('type') === 'google'){
                const [promise, resolver, err] = await signInWithGoogle();
                if (err) {    
                  if(err === 'No Two Factor'){
                    setErr(null)
                    setModalToDisplay(AuthModalEnum.TwoFactor)
                    setShowModal(true)
                    navigate('/profile');
                  }else{
                    setErr(err)
                    setModalToDisplay(AuthModalEnum.SignUp)
                  }
                }
                else {
                  setErr(null)
                  navigate('/profile');
                }
              }

            }}
          >
            Accepter
          </Button>
        </div>
      ) : null}
    </div>
  );
}
