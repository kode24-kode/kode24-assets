import {
  LightningIcon,
  LightningFillIcon,
  Chat2Icon,
  Chat2FillIcon,
  HeartIcon,
  HeartFillIcon,
} from '@navikt/aksel-icons';

import { useState } from 'react';

export default function SortByReactions({
  sortingToggle,
  sortBySortingToggle,
}: {
  sortingToggle: string;
  sortBySortingToggle: (sortingToggle: string) => void;
}) {
  const [sortingState, setSortingState] = useState(sortingToggle);

  return (
    <div className="max-w-screen-xl mx-auto mb-4 relative">
      <ul
        id="sort-latest-articles"
        className="flex gap-2 py-4 justify-start"
      >
        <li>
          <button
            className={`flex items-center gap-1 p-2  ${
              sortingState === 'newest'
                ? ' text-white border-b-2 border-pink-500'
                : 'text-slate-300'
            }`}
            onClick={() => {
              setSortingState('newest');
              sortBySortingToggle('newest');
            }}
            title="Sorter artikler etter siste artikler"
            aria-label="Sorter artikler etter siste artikler"
          >
            {sortingState === 'newest' && (
              <LightningFillIcon
                title="a11y-title"
                fontSize="1.5rem"
              />
            )}
            {sortingState !== 'newest' && (
              <LightningIcon title="a11y-title" fontSize="1.5rem" />
            )}
            siste
          </button>
        </li>
        <li>
          <button
            className={`flex items-center gap-1 p-2   ${
              sortingState === 'mostReactions'
                ? ' text-white border-b-2 border-pink-500'
                : 'text-slate-300'
            }`}
            onClick={() => {
              setSortingState('mostReactions');
              sortBySortingToggle('mostReactions');
            }}
            title="Sorter artikler etter mest reaksjoner"
            aria-label="Sorter artikler etter mest reaksjoner"
          >
            {sortingState === 'mostReactions' && (
              <HeartFillIcon title="a11y-title" fontSize="1.5rem" />
            )}
            {sortingState !== 'mostReactions' && (
              <HeartIcon title="a11y-title" fontSize="1.5rem" />
            )}
            reaksjoner
          </button>
        </li>
        <li>
          <button
            className={`flex items-center gap-1 p-2   ${
              sortingState === 'mostComments'
                ? ' text-white border-b-2 border-pink-500'
                : 'text-slate-300'
            }`}
            onClick={() => {
              setSortingState('mostComments');
              sortBySortingToggle('mostComments');
            }}
            title="Sorter artikler etter mest kommentarer"
            aria-label="Sorter artikler etter mest kommentarer"
          >
            {sortingState === 'mostComments' && (
              <Chat2FillIcon title="a11y-title" fontSize="1.5rem" />
            )}
            {sortingState !== 'mostComments' && (
              <Chat2Icon title="a11y-title" fontSize="1.5rem" />
            )}
            kommentarer
          </button>
        </li>
      </ul>
    </div>
  );
}
