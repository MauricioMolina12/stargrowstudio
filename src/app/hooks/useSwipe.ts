'use client';

import { useRef, useCallback } from 'react';

type SwipeHandlers = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

/**
 * Lightweight hook for detecting horizontal swipe gestures.
 * Uses axis lock to prevent interfering with vertical scroll.
 * Threshold: 50px horizontal movement with 2:1 horizontal ratio.
 */
export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const isSwiping = useRef(false);
  const SWIPE_THRESHOLD = 50;
  const AXIS_LOCK_RATIO = 2;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    isSwiping.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    // Axis lock: if vertical movement dominates, let scroll pass through
    if (Math.abs(dy) > Math.abs(dx) * AXIS_LOCK_RATIO) {
      isSwiping.current = false;
      return;
    }

    if (Math.abs(dx) > 10) {
      isSwiping.current = true;
      lastX.current = touch.clientX;
      e.preventDefault();
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    const dx = lastX.current - startX.current;
    isSwiping.current = false;

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}