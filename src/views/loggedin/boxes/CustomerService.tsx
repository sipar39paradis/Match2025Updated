import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from '../../../components/profile/BreadcrumbWrapper';

export function CustomerService() {
    const navigate = useNavigate();

  return (
    <main>
      <div className="flex justify-start flex-col w-screen p-10 sm:px-30 lg:px-40">
          <BreadcrumbWrapper
            breadcrumbEndpoint={['profile', 'customerService']}
            breadcrumbName={['profil', 'Service Clientelle']}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Service Clientelle
            </h1>
          </BreadcrumbWrapper>

        </div>
    </main>
  );
}
