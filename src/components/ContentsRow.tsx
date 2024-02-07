import { ContentTile } from '../types';
import ContentTileItem from './ContentTile.tsx';
export default function ContentsRow({
  Contents,
  listView,
}: {
  Contents: Array<ContentTile>;
  listView: boolean;
}) {
  console.log('got contents', Contents);
  return (
    <div
      className={`row desktop-row commercial ${
        Contents.length === 1 ? 'single-row' : ''
      }
      ${listView ? 'list-view' : ''}
        `}
    >
      <div className={getLayoutForCommercialRow(Contents.length)}>
        {Contents.map((content: ContentTile, key: number) => (
          <ContentTileItem Content={content} key={key} />
        ))}
      </div>
    </div>
  );
}

function getLayoutForCommercialRow(numberOfContents: number) {
  switch (numberOfContents) {
    case 1:
      return 'single';
    case 2:
      return 'dual';
    case 3:
      return 'triple';
    default:
      return 'triple';
  }
}
