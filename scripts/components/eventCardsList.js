export function initEventCardsListLoading() {
  var diamondPartnersContainer = document.createElement("div");
  return diamondPartnersContainer;
}

/**
 * takes event data and returns markup for the event card
 * @param {*} eventData
 * @returns
 */
export const initEventCardsList = (eventData, node, placement) => {
  // fetch markup for events
  let eventMarkup = getEventsCardMarkup(eventData);
  // create container and add markup
  let eventContainer = document.createElement("div");
  eventContainer.classList.add("row", "added");
  eventContainer.innerHTML = eventMarkup;
  // add container to dom
  if (node) {
    if (placement === "append") {
      node.append(eventContainer);
      return;
    } else if (placement === "after") {
      node.after(eventContainer);
      return;
    }
    node.innerHTML = "";
    node.append(eventContainer);
  }
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
      } (${event.digital ? "digitalt" : "Fysisk"})</p>
            </div>
            <div class="call-to-action">
              <span class="button action-button">Les mer</span>
            </div>
          </div>
        </a>
      </article>
  `
    )
    .join(" ");
};

/**
 * Get markup for events
 * @param {*} events
 * @returns
 */
let getEventsCardMarkup = (events) => {
  return `
  <article class="preview preview-list calendar-list">
    <h3 class="highlight">Bransjekalender</h3>
    <div class="listing">
    ${
      events.premiumEvents.length
        ? getPRemiumEventsCardMarkup(events.premiumEvents)
        : ""
    }
    ${events.upcomingEvents
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
        } (${event.digital ? "digitalt" : "Fysisk"})</p>
          </div>
          <div class="call-to-action">
            <span class="button action-button">Les mer</span>
          </div>
        </div>
      </a>
    </article>
    `
      )
      .join("")}
    </div>
    <div class="listing-actions">
    ${
      events.upcomingEvents.length && events.upcomingEvents.length > 4
        ? `
      <a href="/kalender" class="button">
        Vis alle (${events.upcomingEvents.length})

      </a>

    `
        : ""
    }
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeIpFCZRLdecwbZjLKZ_CSIqs7deA5vU4zHJJTPEa1wUbHo7A/viewform" class="button action">+ legg inn</a>
    </div>
    </article>
`;
};
