import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BoxElement } from './BoxElement';


export function BoxRow() {
    const navigate = useNavigate();

  return (
        <div className='flex flex-row p-12 w-full justify-around'>
            <BoxElement text='gfdgdfgdfg'/>
            <BoxElement text='gsdfsdfdfg'/>
            <BoxElement text='gfdghfghdfg'/>
        </div>
  );
}
