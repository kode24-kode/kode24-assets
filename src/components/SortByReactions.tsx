export default function SortByReactions({
  sortingToggle,
  sortBySortingToggle,
}: {
  sortingToggle: string;
  sortBySortingToggle: (sortingToggle: string) => void;
}) {
  return (
    <ul id="sort-latest-articles">
      <li>
        <button onClick={() => sortBySortingToggle('newest')}>
          Nyeste saker
        </button>
      </li>
      <li>
        <button onClick={() => sortBySortingToggle('mostReactions')}>
          Mest reaksjoner
        </button>
      </li>
      <li>
        <button onClick={() => sortBySortingToggle('mostComments')}>
          Flest kommentarer
        </button>
      </li>
    </ul>
  );
}
