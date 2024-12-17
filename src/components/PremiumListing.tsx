import { Listing } from '../types';

export default function PremiumListing({
  Listings,
}: {
  Listings: Array<Listing>;
}) {
  return (
    <div className="relative bg-white rounded-md max-w-80">
      <div className="">
        <div className="heading pt-8">
          <h2 className="heading-title text flex justify-center text-xl text-center px-8 m-0 mb-8 font-bold">
            Anbefalte stillinger
          </h2>
        </div>
        <ul className="flex flex-col gap-4">
          {Listings.map((listing: Listing, key: number) => {
            return (
              <li
                className="comment-container overflow-hidden flex flex-col justify-between"
                key={key}
              >
                <article
                  id={`article_${listing.id}`}
                  className={`preview columns large-12 small-12 medium-12 compact commercial-content px-4`}
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemProp="itemListElement"
                  role="article"
                  data-id={listing.id}
                  data-label=""
                >
                  <a
                    itemProp="url"
                    href={
                      'https://www.kodejobb.no' +
                      listing.published_url
                    }
                    className="flex gap-4 border-b pb-4"
                  >
                    <figure className="">
                      <img
                        src={`${listing.company.imageUrl}`}
                        loading="lazy"
                        alt={`byline name ${listing.company.name}`}
                        className="w-20 min-w-20"
                      />
                    </figure>
                    <div className="call-to-action-container">
                      <div className="article-preview-text">
                        <div className="labels">
                          <span className="label text-sm text-slate-600">
                            {listing.company.name}
                          </span>
                        </div>
                        <h1 className="headline text-base font-bold">
                          {listing.applicationTitle || listing.title}
                        </h1>
                      </div>
                    </div>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
<div className="absolute bottom-0 right-0 flex flex-col p-4 justify-start items-start">
        <div className="z-20 relative inline-block w-auto bg-slate-300 -translate-x-2 translate-y-2 px-2 py-1 text-sm rounded-md">
          {comments[0].user.name}
        </div>
        <div className=" bg-slate-200 p-2 rounded-md relative">
          {comments[0].bodySnippet}...
        </div>
        <div className="relative inline-block w-auto bg-slate-300 translate-x-2 -translate-y-2 px-2 py-1 text-sm rounded-md text-purple-600">
          {comments[0].articleTitle}
        </div>
      </div>
       */
