import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/**
 * Picks a full width row. A number is the index of the row (0 is the first),
 * a function gets all the rows and can pick by content or relative to another.
 */
export type RowPicker =
  | number
  | ((rows: HTMLElement[]) => HTMLElement | undefined);

const getRows = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>("#front-articles-list .full-width"),
  );

const pickRow = (rows: HTMLElement[], picker: RowPicker) =>
  typeof picker === "number" ? rows[picker] : picker(rows);

/**
 * Hides the items of a list that don't fit above a full width row in the main
 * column, and returns how many are visible.
 *
 * Measuring and hiding is done straight on the DOM in one go: every item is
 * shown, measured, and the ones that don't fit are hidden again before the
 * browser paints. That keeps the measurement from racing with React state, and
 * the browser never sees the in-between state (so no flicker and no resize loops).
 * The items must not set their own `display` style.
 *
 * @param listRef the list, its children are the items
 * @param containerRef the card around the list. Everything between the last
 * item and the bottom of the card (padding, buttons) and its bottom margin is
 * kept free, so the whole card ends before the full width row
 * @param buttonRef a button that should only be shown when items are hidden
 * @param boundary which `.full-width` row to stop at, see RowPicker
 * @param startBoundary push the card down with a top margin so it starts below
 * this `.full-width` row. The margin is measured, so it follows the height of
 * the content above
 * @param fallback count to use when the row doesn't exist
 * @param enabled when false every item is shown and nothing is measured
 * @param remeasureKey measure again when this changes. Use it when content
 * above the list changes height, since the position of the list depends on it
 * @param onMeasured called when the items have been shown/hidden
 */
export default function useFitCount({
  listRef,
  containerRef,
  buttonRef,
  boundary,
  startBoundary,
  fallback,
  itemCount,
  enabled = true,
  remeasureKey,
  onMeasured,
}: {
  listRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  buttonRef?: RefObject<HTMLElement | null>;
  boundary: RowPicker;
  startBoundary?: RowPicker;
  fallback: number;
  itemCount: number;
  enabled?: boolean;
  remeasureKey?: unknown;
  onMeasured?: () => void;
}) {
  const [fitCount, setFitCount] = useState(fallback);
  const onMeasuredRef = useRef(onMeasured);
  onMeasuredRef.current = onMeasured;

  const measure = useCallback(() => {
    const list = listRef.current;
    const container = containerRef.current;
    if (!list || !container) return;
    const items = Array.from(list.children) as HTMLElement[];
    const button = buttonRef?.current;

    const apply = (count: number) => {
      items.forEach((item, index) => {
        item.style.display = enabled && index >= count ? "none" : "";
      });
      // the button is also the way to close the overlay, so keep it when disabled
      if (button) {
        button.style.display = !enabled || count < items.length ? "" : "none";
      }
      setFitCount(count);
      onMeasuredRef.current?.();
    };

    // show everything first, so we measure the full list
    items.forEach((item) => (item.style.display = ""));
    if (startBoundary !== undefined) {
      const start = pickRow(getRows(), startBoundary);
      container.style.marginTop = "";
      const previous = container.previousElementSibling;
      if (start && previous) {
        // vertical margins collapse, so set the whole distance from the previous
        // card. Keep the normal spacing between cards below the full width row
        const previousBottom = previous.getBoundingClientRect().bottom;
        // at least the gap the card itself keeps below it, in case the cards
        // above don't have one
        const spacing = Math.max(
          container.getBoundingClientRect().top - previousBottom,
          parseFloat(
            getComputedStyle(container.firstElementChild ?? container)
              .marginBottom,
          ) || 0,
        );
        const distance = start.getBoundingClientRect().bottom - previousBottom;
        if (distance > 0) container.style.marginTop = `${distance + spacing}px`;
      }
    }
    if (button) button.style.display = "";
    if (!enabled) {
      apply(items.length);
      return;
    }

    const boundaryRow = pickRow(getRows(), boundary);
    if (!boundaryRow || items.length === 0) {
      apply(Math.min(fallback, items.length));
      return;
    }

    const limit = boundaryRow.getBoundingClientRect().top;
    // what sits below the last item: padding, button and the margin of the card
    const below =
      container.getBoundingClientRect().bottom -
      items[items.length - 1].getBoundingClientRect().bottom +
      (parseFloat(getComputedStyle(container).marginBottom) || 0);
    let count = 0;
    for (const item of items) {
      if (item.getBoundingClientRect().bottom + below > limit) break;
      count++;
    }
    apply(Math.max(count, 1));
  }, [
    listRef,
    containerRef,
    buttonRef,
    boundary,
    startBoundary,
    fallback,
    enabled,
  ]);

  useLayoutEffect(() => {
    measure();
  }, [measure, itemCount, remeasureKey]);

  // measure again when the main column changes size (images, ads, resize)
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", schedule);
    const main = document.getElementById("front-articles-list");
    const observer = main ? new ResizeObserver(schedule) : undefined;
    if (main) observer?.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [measure]);

  return { fitCount };
}
