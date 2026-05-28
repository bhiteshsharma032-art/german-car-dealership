import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExpandableTextProps {
  children: React.ReactNode;
  /** Maximum visible lines when collapsed (mobile-only by default) */
  maxLines?: number;
  /** Apply line clamp on all viewports instead of mobile-only */
  alwaysClamp?: boolean;
  className?: string;
  /** Optional override label for the expand toggle */
  expandLabel?: string;
  collapseLabel?: string;
  /** Whitespace handling — 'pre-line' keeps line breaks, 'normal' collapses */
  whitespace?: 'pre-line' | 'normal';
}

/**
 * Mobile-friendly expandable text. Collapses long copy with a "Mehr anzeigen / Weniger anzeigen" toggle.
 * Detects overflow at runtime so short copy never gets a useless toggle button.
 */
export default function ExpandableText({
  children,
  maxLines = 5,
  alwaysClamp = false,
  className = '',
  expandLabel,
  collapseLabel,
  whitespace = 'pre-line',
}: ExpandableTextProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setOverflowing(el.scrollHeight - 2 > el.clientHeight);
  }, [children, isMobile, expanded]);

  const shouldClamp = (alwaysClamp || isMobile) && !expanded;

  const showMore = (() => {
    const fallback = t('card.show_more');
    return expandLabel || (fallback && fallback !== 'card.show_more' ? fallback : 'Mehr anzeigen');
  })();
  const showLess = (() => {
    const fallback = t('car.features.show_less');
    return collapseLabel || (fallback && fallback !== 'car.features.show_less' ? fallback : 'Weniger anzeigen');
  })();

  return (
    <div className={className}>
      <div
        ref={ref}
        style={
          shouldClamp
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                whiteSpace: whitespace === 'pre-line' ? 'pre-line' : 'normal',
              }
            : { whiteSpace: whitespace === 'pre-line' ? 'pre-line' : 'normal' }
        }
      >
        {children}
      </div>
      {(overflowing || expanded) && (alwaysClamp || isMobile) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
        >
          {expanded ? showLess : showMore}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}
