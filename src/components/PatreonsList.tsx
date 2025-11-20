import type { Patreon } from "../types";
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
        {GoldPatreons.map((patreon) => (
          <li key={patreon.link} className="patreon">
            <img src={patreon.logo} alt={patreon.name} loading="lazy" />
          </li>
        ))}
      </ul>
      <ul className="patreons-list silver">
        {SilverPatreons.map((patreon) => (
          <li key={patreon.link} className="patreon">
            <img src={patreon.logo} alt={patreon.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
}
