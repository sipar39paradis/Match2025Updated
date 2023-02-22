import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface BoxElementProps {
    text: string
    onClick?: any
}

export function BoxElement({text, onClick}: BoxElementProps) {
    const navigate = useNavigate();

  return (
<>
    <p className='pr-8' onClick={onClick}>
        {text}
    </p>
</>
  );
}
