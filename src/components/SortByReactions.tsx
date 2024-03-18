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
    <ul id="sort-latest-articles">
      <li>
        <button
          className={sortingState === 'newest' ? 'active' : ''}
          onClick={() => {
            setSortingState('newest');
            sortBySortingToggle('newest');
          }}
          title="Sorter artikler etter siste artikler"
          aria-label="Sorter artikler etter siste artikler"
        >
          {sortingState === 'newest' && (
            <LightningFillIcon title="a11y-title" fontSize="1.5rem" />
          )}
          {sortingState !== 'newest' && (
            <LightningIcon title="a11y-title" fontSize="1.5rem" />
          )}
          siste
        </button>
      </li>
      <li>
        <button
          className={sortingState === 'mostReactions' ? 'active' : ''}
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
          className={sortingState === 'mostComments' ? 'active' : ''}
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
  );
}
