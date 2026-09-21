"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type UseTypeaheadOptions<T> = {
  items: T[];
  /** Set false to suspend navigation while the list is hidden. */
  open?: boolean;
  onSelect?: (item: T, index: number) => void;
};

export function useTypeahead<T>({
  items,
  open = true,
  onSelect,
}: UseTypeaheadOptions<T>) {
  const listId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState<{
    items: T[];
    index: number;
  }>({ items, index: -1 });

  const activeIndex = activeState.items === items ? activeState.index : -1;
  const setActiveIndex = (nextIndex: number | ((index: number) => number)) => {
    setActiveState((previous) => {
      const currentIndex = previous.items === items ? previous.index : -1;
      const index =
        typeof nextIndex === "function" ? nextIndex(currentIndex) : nextIndex;

      return { items, index };
    });
  };

  const isOpen = open && items.length > 0;
  const optionId = (index: number) => `${listId}-option-${index}`;

  useEffect(() => {
    if (activeIndex < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % items.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => (index <= 0 ? items.length - 1 : index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case "Enter":
        if (activeIndex < 0) break;
        event.preventDefault();
        onSelect?.(items[activeIndex], activeIndex);
        break;
      case "Escape":
        setActiveIndex(-1);
        break;
    }
  };

  return {
    activeIndex,
    inputProps: {
      role: "combobox" as const,
      "aria-expanded": isOpen,
      "aria-controls": listId,
      "aria-autocomplete": "list" as const,
      "aria-activedescendant":
        isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined,
      onKeyDown,
    },
    listProps: {
      id: listId,
      role: "listbox" as const,
      ref: listRef,
    },
    getItemProps: (index: number) => ({
      id: optionId(index),
      role: "option" as const,
      "aria-selected": index === activeIndex,
      "data-index": index,
      onMouseMove: () => setActiveIndex(index),
      onClick: () => onSelect?.(items[index], index),
    }),
  };
}
