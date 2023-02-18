/* eslint-disable @typescript-eslint/no-var-requires */
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../utils/utils';
import { Footer } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export function CustomFooter() {
  const navigate = useNavigate();
  return (
    <Footer container={true}>
      <Footer.Copyright by="Impot Match" year={2023} />
      <Footer.LinkGroup>
        <a
          className="cursor-pointer"
          onClick={() => {
            navigate('/userConditions');
          }}
        >
          {"Conditions D'utilisation"}
        </a>
      </Footer.LinkGroup>
    </Footer>
  );
}
