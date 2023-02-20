import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface BoxElementProps {
    text: string
}

export function BoxElement({text}: BoxElementProps) {
    const navigate = useNavigate();

  return (
<>
    <p className='pr-8'>
        {text}
    </p>
</>
  );
}
