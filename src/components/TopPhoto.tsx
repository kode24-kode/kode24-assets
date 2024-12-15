/**
 *
 * Stretches the first photo of the first article across the top part of the screen
 */
export default function TopPhoto({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="top-photo absolute top-0 left-0 w-dvw h-dvh">
      <img
        src={imageUrl}
        alt="Top photo"
        className="w-full blur-3xl opacity-20"
      />
    </div>
  );
}
