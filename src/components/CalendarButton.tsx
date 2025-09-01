import { GrCalendar } from "react-icons/gr";
import { Event } from "../types";
import TimePostedAgo from "./TimePostedAgo";
import { useState, useEffect, useRef } from "react";


export default function CalendarButton({ counter, calendarItems }: { counter: number, calendarItems: Event[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Handle ESC key and outside clicks
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggle(e);
    }
  };

  return (
    <div ref={dropdownRef}>
      <a
        ref={buttonRef}
        href="//www.kode24.no/kalender"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Kalender med ${counter} arrangementer. ${isOpen ? 'Lukk' : 'Åpne'} dropdown`}
        tabIndex={0}
      >
        <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 2V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 2V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 10H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg><span className="counter">{ counter }</span><span className="site-title">kalender</span>
      </a>
      <div
        className={`calendar-items-slider-menu ${isOpen ? "open" : ""}`}
        role="menu"
        aria-label="Kalender arrangementer"
        aria-hidden={!isOpen}
      >
        {calendarItems.map((item) => (
          <div key={item.link}>
            <article
      className={`preview columns large-12 small-12 medium-12 compact listing commercial-content`}
    >
      <div className="article-content-wrapper">
        <a
          itemProp="url"
          href={item.link}
        >
          <figure
          >
            <img
              className="logo"
              itemProp="image"
              loading="lazy"
              alt={`image: ${item.name}`}
              src={item.photo}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a
            itemProp="url"
            href={item.link}
          >
            <div>
              <h1 className="headline">
                <span className="headline-title-wrapper">
                  {item.name}
                </span>
              </h1>
              <p className="company-name">{item.arrangedBy}</p>
              <p>{item.digital ? "Digitalt" : "Fysiskt"}</p>
            </div>
            {item.startDate && (
              <div className="listing-hide-from">
                <GrCalendar /> Frist:{" "}
                <TimePostedAgo dateString={item.startDate} />
              </div>
            )}
          </a>
        </div>
      </div>
    </article>
          </div>
        ))}
      </div>
    </div>
  );
}