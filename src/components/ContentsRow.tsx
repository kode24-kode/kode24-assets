import { Content } from '../types';
import ContentTile from './ContentTile.tsx';
export default function ContentsRow({
  Contents,
}: {
  Contents: Array<Content>;
}) {
  return (
    <div className={`row desktop-row commercial`}>
      <div className="heading">
        <h2 className="heading-title">Annonsørinnhold</h2>
      </div>
      <div className={getLayoutForCommercialRow(Contents.length)}>
        {Contents.map((content: Content, key: number) => (
          <ContentTile Content={content} key={key} />
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
