import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from '../../../components/profile/BreadcrumbWrapper';
import { BoxBody } from '../../../components/boxComponents/BoxBody';

export function Familly() {
    const navigate = useNavigate();

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
          <BreadcrumbWrapper
            breadcrumbEndpoint={['profile', 'familly']}
            breadcrumbName={['profil', 'famille']}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Familly
            </h1>
            <BoxBody/>
          </BreadcrumbWrapper>

        </div>

    </main>
  );
}
