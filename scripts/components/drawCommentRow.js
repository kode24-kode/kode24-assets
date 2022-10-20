export function drawCommentRow(
  articleData,
  articleIds,
  articlesList
) {
  articlesList.forEach((element, index) => {
    let commentData = articleData.find(
      (article) => article.id === articleIds[index]
    );
    let bylineData = articleData.find(
      (article) => article.id === articleIds[index]
    );
    if (commentData) {
      let numberofReactions =
        commentData.commentsData &&
        commentData.commentsData.reactions.length
          ? commentData.commentsData.reactions.reduce(
              (sum, number) => sum + number,
              0
            )
          : 0;
      let numberofComments =
        commentData.commentsData &&
        commentData.commentsData.comments_count
          ? commentData.commentsData.comments_count
          : 0;

      element.appendChild(
        getSocialRowNode(
          numberofComments,
          numberofReactions,
          commentData.tags || [],
          commentData && commentData.id ? commentData.id : '',
          bylineData
        )
      );
    }
  });
}

function getSocialRowNode(
  commentCount,
  reactionsCount,
  tagsList,
  articleId,
  bylineData
) {
  let newElement = document.createElement('div');
  newElement.classList.add('article-social');
  newElement.innerHTML = `

    <div class="social-buttons">
        <div class="article-social-reactions article-social-item">
            <a href="https://www.kode24.no/${articleId}#hyvor-talk-view" class="reaction-button reaction">${reactionsCount}</a>
        </div>
        <div class="article-social-comments article-social-item">
            <a href="https://www.kode24.no/${articleId}#hyvor-talk-view" class="reaction-button comment">${commentCount}</a>
        </div>
    </div>
    <div class="article-social-tags article-social-item">
        ${tagsList
          .slice(0, 2)
          .map(
            (tag) =>
              `<a class="social-tag" href="https://www.kode24.no/emne/${tag}">#${tag}</a>`
          )
          .join('')}
    </div>
    `;
  newElement.prepend(
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
  return newElement;
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
