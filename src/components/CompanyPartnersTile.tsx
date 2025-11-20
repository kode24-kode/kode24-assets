import { useEffect, useRef } from "react";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import { shuffleArray } from "../functions/shuffleArray";
import type { CompanyPartner } from "../types";
import "react-multi-carousel/lib/styles.css";

function fixSanityUrl(url: string) {
  if (!url || typeof url !== "string") return url;
  if (url.includes(".svg")) return url;
  try {
    const u = new URL(url);
    u.searchParams.delete("w");
    if (!u.searchParams.has("format")) {
      u.searchParams.append("format", "webp");
    }
    return encodeURIComponent(u.toString());
  } catch {
    return url;
  }
}

export default function CompanyPartnersTile({
  companyPartners,
}: {
  companyPartners: Array<CompanyPartner>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shuffledCompanyPartners = shuffleArray(
    companyPartners
  ) as Array<CompanyPartner>;

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hvor langt seksjonen er inne i viewport (0..1)
      const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);

      const baseMove = (progress - 0.5) * 60; // maks ±10px
      const logos = section.querySelectorAll<HTMLLIElement>("li");

      const screenCenterX = window.innerWidth / 2;
      const maxDistance = screenCenterX;

      logos.forEach((logo) => {
        const logoRect = logo.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const distanceFromCenter = Math.abs(logoCenterX - screenCenterX);
        const direction = logoCenterX < screenCenterX ? -1 : 1;

        // 0 (midt på) → 1 (helt ute ved kanten)
        const intensity = distanceFromCenter / maxDistance;

        // Jo lenger unna midten, jo mer bevegelse
        const offset = direction * baseMove * intensity;

        logo.style.transform = `translateX(${offset}px)`;
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      id="diamond-partners-list-tile"
      className="row desktop-row card single-row full-width relative overflow-hidden"
    >
      <div className="heading constrained">
        <h2 className="heading-title">
          💡 Ny karriere? Bli kjent med våre partnere
        </h2>
        <a
          href="https://partner.kode24.no"
          target="_blank"
          className="button"
          rel="noopener"
        >
          Finn ut mer
        </a>
      </div>

      <div className="single2">
        <ul className="logo-list flex flex-wrap justify-center">
          {shuffledCompanyPartners.map((companyPartner: CompanyPartner) => (
            <li
              key={companyPartner.slug}
              style={{
                transition: "transform 0.3s ease-out",
                willChange: "transform",
              }}
            >
              <a
                href={"https://partner.kode24.no/" + companyPartner.slug}
                className="block text-center"
              >
                <img
                  className="dark"
                  src={getImageCacheUrl(fixSanityUrl(companyPartner.darkLogo))}
                  alt={"partner logo " + companyPartner.slug}
                  loading="lazy"
                />
                <img
                  className="light"
                  src={getImageCacheUrl(fixSanityUrl(companyPartner.lightLogo))}
                  alt={"partner logo " + companyPartner.slug}
                  loading="lazy"
                />
                <span className="description">{companyPartner.tooltip}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
