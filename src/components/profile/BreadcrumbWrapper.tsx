import { Breadcrumb } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbWrapperProps {
  breadcrumbName: string[];
  breadcrumbEndpoint: string[];
  children: any;
}

export function BreadcrumbWrapper({
  breadcrumbName,
  breadcrumbEndpoint,
  children,
}: BreadcrumbWrapperProps) {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example"
        className='pb-2'>
        <Breadcrumb.Item href="/home" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <>
            {breadcrumbName.map((name, i) => {
            return( 
            <Breadcrumb.Item 
            onClick={() => navigate(`/${breadcrumbEndpoint[i]}`)}
            key={`breadcrumb${i}`}>
                {name}
            </Breadcrumb.Item>)
            })}
        </>
      </Breadcrumb>
      {children}
    </>
  );
}
