import { Breadcrumb } from 'flowbite-react';
import React from 'react';
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
      <Breadcrumb aria-label="Default breadcrumb example" className="pb-2">
        <>
          {breadcrumbName.map((name, i) => {
            return (
              <Breadcrumb.Item
                className="cursor-pointer"
                onClick={() => navigate(`/${breadcrumbEndpoint[i]}`)}
                key={`breadcrumb${i}`}
              >
                {name}
              </Breadcrumb.Item>
            );
          })}
        </>
      </Breadcrumb>
      {children}
    </>
  );
}
