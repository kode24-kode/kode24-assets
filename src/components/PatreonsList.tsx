import { Patreon } from '../types';
export default function PatreonsList({
  GoldPatreons,
  SilverPatreons,
}: {
  GoldPatreons: Patreon[];
  SilverPatreons: Patreon[];
}) {
  return (
    <div className="patreons">
      <ul className="patreons-list gold">
        {GoldPatreons.map((patreon, key) => (
          <li key={key} className="patreon">
            <img
              src={patreon.logo}
              alt={patreon.name}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
      <ul className="patreons-list silver">
        {SilverPatreons.map((patreon, key) => (
          <li key={key} className="patreon">
            <img
              src={patreon.logo}
              alt={patreon.name}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
