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
        >
          {sortingState === 'newest' && (
            <LightningFillIcon title="a11y-title" fontSize="1.5rem" />
          )}
          {sortingState !== 'newest' && (
            <LightningIcon title="a11y-title" fontSize="1.5rem" />
          )}
          Siste nytt
        </button>
      </li>
      <li>
        <button
          className={sortingState === 'mostReactions' ? 'active' : ''}
          onClick={() => {
            setSortingState('mostReactions');
            sortBySortingToggle('mostReactions');
          }}
        >
          {sortingState === 'mostReactions' && (
            <HeartFillIcon title="a11y-title" fontSize="1.5rem" />
          )}
          {sortingState !== 'mostReactions' && (
            <HeartIcon title="a11y-title" fontSize="1.5rem" />
          )}
          Reaksjoner
        </button>
      </li>
      <li>
        <button
          className={sortingState === 'mostComments' ? 'active' : ''}
          onClick={() => {
            setSortingState('mostComments');
            sortBySortingToggle('mostComments');
          }}
        >
          {sortingState === 'mostComments' && (
            <Chat2FillIcon title="a11y-title" fontSize="1.5rem" />
          )}
          {sortingState !== 'mostComments' && (
            <Chat2Icon title="a11y-title" fontSize="1.5rem" />
          )}
          Kommentarer
        </button>
      </li>
    </ul>
  );
}
