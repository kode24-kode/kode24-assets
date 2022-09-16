![alt text](https://raw.githubusercontent.com/kode24-kode/kode24-kode.github.io/main/docs/assets/images/kode24-logo-dark-mode.png)

# kode24 assets

This project provides all JavaScript and styling for kode24.no. It is a companion to the backend-rendered HTML-templates
built with our CMS, Labrador. The goal is to enrich our pages with commercial and editorial functionality that we are unable to render from the backend.

## Architecture and development

The project is built with Vite and is **vanilla JavaScript**. All styles are compiled in to one CSS file shared across all pages.
The JavaScript is split into two files, one for all frontpages of kode24 (/, /emne/\*, etc..) and one
for all articles. The reason for this is that our CMS templates only provide templates for those two scenarios.

The article JavaScript has handlers for both editorial and commercial articles and pages.

The JavaScript code is split into two categories:
Either a component which injects HTML or a function that either listens to changes, does small changes to the DOM or
manipulates data.
All API requests are kept in one file in the API-filer.

## Developer requirements

For local development you need to have an instance of kode24-functions running in order to handle API-requests.
Contact jorgen@kode24.no for access.

You also need:

- Yarn

## local development

For local development run `yarn run dev`.

## Functionality

### Functionality on all pages

- Updating number of job listings in top menu
- Updating number of events from the event-calendar in top menu
- Job listing in right aside
- Sponsor listing in left aside
- inline search in top bar
- convert all lazy loading images from our CMS to browser based lazy loading
- upscale all images

### Frontpage specific functionality

- Content listing in main feed
- Premier job listing card in main feed
- Event caledar listing card in main feed
- Adding byline for all previews of articles
- Adding reactions and comments for all previews of articles
- Adding tags for all previews of articles
- tracking of clicks and views of commercial elements (anonymous)

### Editorial article specific functionality

- Content and job listings in article. After every other headline
- Listing of related articles based on articles tag
- Image expansion for inline images that users can expand
- Highlight.js for code snippets

### Commercial article and job ad specific functionality

- Quick-application form for all job ads tagget with "jobbmail:x@x.xx"
