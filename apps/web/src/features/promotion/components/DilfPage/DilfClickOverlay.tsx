import { useMemo } from 'react';

import { dilfCityList } from './data/dilf-city-list';
import { dilfImageMappingPaths } from './data/dilf-image-mapping-paths';

export type DilfClickOverlayProps = {
  className?: string;
  debug?: boolean;
};

export function DilfClickOverlay({
  className = '',
  debug = false,
}: DilfClickOverlayProps) {
  const renderData = useMemo(
    () =>
      dilfImageMappingPaths.map((definition, index) => ({
        path: definition,
        // No need for translating this.
        query: `donut shop in ${dilfCityList[index]}`,
      })),
    [],
  );

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
    >
      {renderData.map(({ path, query }, index) => (
        <a
          href={`//maps.google.com/?q=${query}`}
          target="_blank"
          key={query}
          rel="noopener noreferrer"
        >
          <path
            d={path}
            fill={debug ? `hsl(${(index * 3) % 360}, 100%, 50%)` : '#fff0'}
            className="mix-blend-screen blur-md transition-all duration-200 ease-in-out hover:fill-orange-700"
          />
        </a>
      ))}
    </svg>
  );
}
