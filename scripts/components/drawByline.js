export function drawByline(articleData, articleIds, articlesList) {
  articlesList.forEach((element, index) => {
    let bylineData = articleData.find(
      (article) => article.id === articleIds[index]
    );
    if (bylineData && bylineData.byline) {
      let previewElement = element.querySelector(
        '.article-preview-text'
      );
      previewElement.append(
        getBylineRowNode({
          public_email: bylineData.byline.email || '',
          profile_link: '',
          profession: '',
          lastname: bylineData.byline.lastname || '',
          firstname: bylineData.byline.firstname || '',
          email: bylineData.byline.email || '',
          description: '',
          bio: bylineData.byline.bio || '',
          imageUrl: bylineData.byline.imageUrl || '',
        })
      );
    }
  });
}

function getBylineRowNode({ firstname, lastname, bio, imageUrl }) {
  let newElement = document.createElement('div');
  newElement.classList.add('byline-row');
  newElement.innerHTML = `
        <div class="byline-profile-image">
          <img src="https://dbstatic.no${imageUrl}" loading="lazy" />
        </div>
        <div class="byline-info">
          <div class="byline-name">${firstname} ${lastname}</div>
          <div class="byline-bio">${bio}</div>
        </div>
    `;
  return newElement;
}
