'use client';

import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface CategoryData {
  category: string;
  count: number;
  barColor: string;
}

interface CategoryBarProps {
  data?: CategoryData[];
  isLoading?: boolean;
}

export default function CategoryBar({ data = [], isLoading = false }: CategoryBarProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1); // fallback max to 1 to avoid division by 0

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800">Product Category Distribution</h2>

      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="rectangular" width="100%" height={12} sx={{ borderRadius: 999 }} />
            </div>
          ))
        : data.map(({ category, count, barColor }) => {
            const widthPercent = (count / maxCount) * 100;
            return (
              <div key={category} className="space-y-1">
                <div className="text-sm font-medium text-gray-700">
                  {category}: {count}
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 hover:opacity-90"
                    style={{ width: `${widthPercent}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
}
