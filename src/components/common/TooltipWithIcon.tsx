import React from 'react';
import { ReactComponent as QuestionMark } from '../../icons/QuestionMark.svg';
import { PlacesType, Tooltip } from 'react-tooltip';

interface TooltipWithIconProps {
  text: string;
  place?: PlacesType;
}

export function TooltipWithIcon(props: TooltipWithIconProps) {
  const { text, place = 'top' } = props;
  return (
    <span className="relative inline-block ml-2 h-4">
      <QuestionMark
        className="cursor-pointer w-5 fill-orange-500"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={text}
      ></QuestionMark>
      <Tooltip
        id="my-tooltip"
        className="w-96 absolute bg-white z-10 p-4 rounded-lg  border-black border !opacity-100"
        place={place}
      />
    </span>
  );
}
