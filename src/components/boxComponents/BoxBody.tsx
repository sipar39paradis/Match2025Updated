import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxRow } from './BoxRow';


export function BoxBody() {
    const navigate = useNavigate();

  return (
    <div className='flex flex-col'>

            <BoxRow/>
            <BoxRow/>
            <BoxRow/>

        
    </div>
  );
}
