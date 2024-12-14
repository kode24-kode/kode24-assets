import { Comment } from '../types';
import CommentTile from './CommentTile';
import { getTimeAgo } from '../functions/getTimeAgo';
import htmlDecode from '../functions/decodeStringWithSpecialCharacters';

export default function CommentsTile({
  comments,
}: {
  comments: Array<Comment>;
}) {
  return (
    <div className="relative bg-slate-200 w-svw left-1/2 -translate-x-1/2 mb-16">
      <div className="newest-comments social-component desktop-row card">
        <div className="heading pt-8">
          <h2 className="heading-title text flex justify-center text-4xl px-8 m-0">
            💬 Nyeste kommentarer
          </h2>
        </div>
        <ul className="newest-comments-list p-8 flex overflow-auto gap-8">
          {comments.map((comment: Comment, key: number) => {
            return (
              <li
                className="comment-container w-80 min-w-80 bg-white rounded-md overflow-hidden flex flex-col justify-between"
                key={key}
              >
                <div className="p-4">
                  <div className="">{comment.user.name}</div>
                  <div className="text-slate-400">
                    {comment.created_at &&
                      getTimeAgo(comment.created_at)}
                  </div>
                  <div className=" p-4">
                    {htmlDecode(comment.bodySnippet)}
                    {comment.bodySnippet.charAt(
                      comment.bodySnippet.length - 1
                    ) != '.' && '...'}
                  </div>
                </div>
                <a
                  href={
                    'https://www.kode24.no/' + comment.page_identifier
                  }
                  className="truncate block p-4 bg-slate-200 text-purple-600 m-4 rounded-md"
                >
                  {comment.articleTitle}
                </a>
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
