import React from 'react';

interface BoxElementProps {
  text: string;
  onClick?: any;
}

export function BoxElement({ text, onClick }: BoxElementProps) {
  return (
    <>
      <p className="pr-8 font-semibold" onClick={onClick}>
        {text}
      </p>
    </>
  );
}
