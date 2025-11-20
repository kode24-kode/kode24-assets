import Carousel from "react-multi-carousel";
import type { Listing } from "../types";
import ListingTile from "./ListingTile.tsx";
import "react-multi-carousel/lib/styles.css";
import type { ButtonGroupProps } from "react-multi-carousel/lib/types";

export default function ListingsRow({
  Listings,
  customHeading,
}: {
  Listings: Array<Listing>;
  customHeading?: string;
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 1023, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="desktop-row commercial listing-carousel">
      <div className="heading">
        <h2 className="heading-title">
          {customHeading ? customHeading : "Ledige stillinger"}
        </h2>
        <a
          href="https://kodejobb.no"
          target="_blank"
          className="button"
          rel="noopener"
        >
          Se alle
        </a>
      </div>
      <div className={`triple mobile-scroll mobile-only`}>
        {Listings.map((listing: Listing, key: number) => (
          <ListingTile Listing={listing} key={key} />
        ))}
      </div>
      <div className="desktop-only listing-wrapper">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          arrows={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={8000}
          keyBoardControl={false}
          transitionDuration={1000}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          renderButtonGroupOutside={true}
          customButtonGroup={<CarouselButtonGroup />}
        >
          {Listings.map((Listing, key: number) => {
            return <ListingTile Listing={Listing} key={key} />;
          })}
        </Carousel>
      </div>
    </div>
  );
}

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
}

const CarouselButtonGroup = ({ next, previous }: CarouselButtonGroupProps) => {
  return (
    <div className="buttons-group">
      <button
        type="button"
        aria-label="Gå til forrige side"
        onClick={() => previous?.()}
        className="left-button"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Gå til neste side"
        onClick={() => next?.()}
        className="right-button"
      >
        ›
      </button>
    </div>
  );
};
