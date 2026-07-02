import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for native drag and resize of window elements.
 * Replaces interactjs with native mouse/touch events.
 *
 * @param {Object} options
 * @param {React.MutableRefObject} options.positionRef - ref to { x, y }
 * @param {Function} options.setPosition - state setter for position
 * @param {Function} options.setSize - state setter for { width, height }
 * @param {Function} options.onDragStart - called when drag starts
 * @param {string} options.containerId - id of the bounding container
 * @param {string} options.windowId - id of the window element
 */
export function useDragResize({
  positionRef,
  setPosition,
  setSize,
  onDragStart,
  containerId = 'screen',
  windowId,
  isFullscreen = false,
}) {
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeEdge = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const getClientPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  // --- DRAG ---
  const handleDragStart = useCallback(
    (e) => {
      // Disable drag in fullscreen
      if (isFullscreen) return;
      // Only allow drag from the top-bar area
      const topBar = e.target.closest('[data-topbar]');
      if (!topBar) return;
      // Don't drag if clicking buttons
      if (e.target.closest('button')) return;

      e.preventDefault();
      isDragging.current = true;
      const { clientX, clientY } = getClientPos(e);
      dragStart.current = {
        x: clientX - positionRef.current.x,
        y: clientY - positionRef.current.y,
      };
      if (onDragStart) onDragStart();
    },
    [onDragStart, positionRef, isFullscreen]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const { clientX, clientY } = getClientPos(e);
      const newX = clientX - dragStart.current.x;
      const newY = clientY - dragStart.current.y;
      setPosition({ x: newX, y: newY });
    },
    [setPosition]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // --- RESIZE ---
  const getResizeEdge = useCallback((e, el) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const threshold = 8;
    const { clientX, clientY } = getClientPos(e);
    const edges = {
      left: clientX - rect.left < threshold,
      right: rect.right - clientX < threshold,
      bottom: rect.bottom - clientY < threshold,
    };
    if (edges.bottom && edges.right) return 'bottom-right';
    if (edges.bottom && edges.left) return 'bottom-left';
    if (edges.right) return 'right';
    if (edges.left) return 'left';
    if (edges.bottom) return 'bottom';
    return null;
  }, []);

  const handleResizeStart = useCallback(
    (e) => {
      // Disable resize in fullscreen
      if (isFullscreen) return;
      const el = document.getElementById(windowId);
      if (!el) return;
      const edge = getResizeEdge(e, el);
      if (!edge) return;
      // Don't start resize if we're on the top-bar
      if (e.target.closest('[data-topbar]')) return;

      e.preventDefault();
      e.stopPropagation();
      isResizing.current = true;
      resizeEdge.current = edge;
      const { clientX, clientY } = getClientPos(e);
      dragStart.current = { x: clientX, y: clientY };
      const rect = el.getBoundingClientRect();
      initialSize.current = { width: rect.width, height: rect.height };
      initialPos.current = { ...positionRef.current };
    },
    [windowId, getResizeEdge, positionRef, isFullscreen]
  );

  const handleResizeMove = useCallback(
    (e) => {
      if (!isResizing.current) return;
      e.preventDefault();
      const { clientX, clientY } = getClientPos(e);
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      const edge = resizeEdge.current;
      let newWidth = initialSize.current.width;
      let newHeight = initialSize.current.height;
      let newX = initialPos.current.x;
      let newY = initialPos.current.y;

      if (edge.includes('right')) {
        newWidth = Math.max(100, initialSize.current.width + dx);
      }
      if (edge.includes('left')) {
        const widthDelta = Math.min(dx, initialSize.current.width - 100);
        newWidth = initialSize.current.width - widthDelta;
        newX = initialPos.current.x + widthDelta;
      }
      if (edge.includes('bottom')) {
        newHeight = Math.max(100, initialSize.current.height + dy);
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    },
    [setSize, setPosition]
  );

  const handleResizeEnd = useCallback(() => {
    isResizing.current = false;
    resizeEdge.current = null;
  }, []);

  // --- CURSOR ---
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging.current) {
        handleDragMove(e);
        return;
      }
      if (isResizing.current) {
        handleResizeMove(e);
        return;
      }
    },
    [handleDragMove, handleResizeMove]
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
    handleResizeEnd();
  }, [handleDragEnd, handleResizeEnd]);

  const updateCursor = useCallback(
    (e) => {
      const el = document.getElementById(windowId);
      if (!el || isDragging.current || isResizing.current || isFullscreen) return;
      const edge = getResizeEdge(e, el);
      if (edge === 'bottom-right') el.style.cursor = 'nwse-resize';
      else if (edge === 'bottom-left') el.style.cursor = 'nesw-resize';
      else if (edge === 'right' || edge === 'left') el.style.cursor = 'ew-resize';
      else if (edge === 'bottom') el.style.cursor = 'ns-resize';
      else el.style.cursor = 'default';
    },
    [windowId, getResizeEdge]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    handleDragStart,
    handleResizeStart,
    updateCursor,
  };
}
