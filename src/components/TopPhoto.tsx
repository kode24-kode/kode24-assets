/**
 *
 * Stretches the first photo of the first article across the top part of the screen
 */
export default function TopPhoto({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="top-photo">
      <img src={imageUrl} alt="Top photo" />
    </div>
  );
}
