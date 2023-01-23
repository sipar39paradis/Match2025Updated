import React from 'react';

interface AuthButtonProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  text: string;
}

export function AuthButton(props: AuthButtonProps) {
  const { Icon, onClick, text } = props;

  return (
    <button
      className=" hover:bg-gray-100 text-black font-semibold my-2 py-2 px-4 w-full border border-black text-sm relative"
      type="button"
      onClick={() => onClick()}
    >
      <Icon className="absolute  h-7 bottom-1 w-auto" />
      {text}
    </button>
  );
}
