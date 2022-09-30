/**
 * fetches events from api and renders them
 * @param {*} selector
 * @returns
 */
export const initEventCardsList = (eventData, selector) => {
  // fetch markup for events
  let eventMarkup = getEventsCardMarkup(eventData);
  // create container and add markup
  let eventContainer = document.createElement('div');
  eventContainer.classList.add('row', 'added');
  eventContainer.innerHTML = eventMarkup;
  // add container to dom
  document.querySelector(selector).after(eventContainer);

  return eventData.eventsCount;
};

/**
 * If an event is premium, AKA paid for, show with different markup
 * @param {*} premiumEvents
 * @returns
 */
let getPRemiumEventsCardMarkup = (premiumEvents) => {
  return premiumEvents
    .map(
      (event) => `
    <article class="preview premium calendar" itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem" role="article">
      <a itemprop="url" href="${event.link}">
          <figure>
            <img itemprop="image" alt="logo" src="${
              event.photo
            }" loading="lazy">
          </figure>
          <div class="call-to-action-container">
            <div class="article-preview-text">
              <div class="labels">
                <span class="label">${event.arrangedBy}</span>
              </div>
              <h1 class="headline"><span class="headline-title-wrapper">${
                event.name
              }</span></h1>
              <p class="standfirst">${event.startDateFormatted} - ${
        event.startDateFormatted
      } (${event.digital ? 'digitalt' : 'Fysisk'})</p>
            </div>
            <div class="call-to-action">
              <span class="button action-button">Les mer</span>
            </div>
          </div>
        </a>
      </article>
  `
    )
    .join(' ');
};

/**
 * Get markup for events
 * @param {*} events
 * @returns
 */
let getEventsCardMarkup = (events) => {
  return `
  <article class="preview preview-list calendar">
    <div class="article-preview-text">
      <div class="labels"><span class="label calendar">kodebransje-kalenderen</span></div>
    </div>
    <div class="listing">
    ${
      events.premiumEvents.length
        ? getPRemiumEventsCardMarkup(events.premiumEvents)
        : ''
    }
    ${events.nextEvents
      .slice(0, 4)
      .map(
        (event) => `
    <article class="preview calendar" itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem" role="article">
      <a itemprop="url" href="${event.link}">
        <figure>
          <img itemprop="image" alt="logo" src="${event.photo}">
        </figure>
        <div class="call-to-action-container">
          <div class="article-preview-text">
            <div class="labels">
              <span class="label">${event.arrangedBy}</span>
            </div>
            <h1 class="headline"><span class="headline-title-wrapper">${
              event.name
            }</span></h1>
            <p class="standfirst">${event.startDateFormatted} - ${
          event.startDateFormatted
        } (${event.digital ? 'digitalt' : 'Fysisk'})</p>
          </div>
          <div class="call-to-action">
            <span class="button action-button">Les mer</span>
          </div>
        </div>
      </a>
    </article>
    `
      )
      .join('')}
    </div>
    ${
      events.nextEvents.length && events.nextEvents.length > 4
        ? `<div class="listing-actions">
      <a href="/kalender" class="button">
        Vis alle arrangementer (${events.eventsCount})
      </a>
    </div>`
        : ''
    }
    </article>
`;
};
