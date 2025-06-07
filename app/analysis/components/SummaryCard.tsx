'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import {
  LocalHospitalOutlined,
  BiotechOutlined,
  Groups2Outlined,
  VaccinesOutlined,
} from '@mui/icons-material';

type Props = {
  title: string;
  value: number | string;
  description: string;
  iconType: 'patients' | 'tests' | 'doctors' | 'vaccines';
};

// Icon Map – small size and black
const iconMap = {
  patients: <Groups2Outlined className="text-black" fontSize="small" />,
  tests: <BiotechOutlined className="text-black" fontSize="small" />,
  doctors: <LocalHospitalOutlined className="text-black" fontSize="small" />,
  vaccines: <VaccinesOutlined className="text-black" fontSize="small" />,
};

const SummaryCard: React.FC<Props> = ({
  title,
  value,
  description,
  iconType,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-300 w-full h-44 transform hover:shadow-xl hover:scale-[1.03]"
    >
      {/* Top Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-black">{title}</h2>
        <div className="bg-gray-100 rounded-full p-2">
          {iconMap[iconType]}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-3xl font-bold text-black">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
