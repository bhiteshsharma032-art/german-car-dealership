import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AccordionItemProps {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, content, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-[#f87171] transition-colors group"
      >
        <span className="text-lg font-semibold text-gray-100 group-hover:text-[#f87171] transition-colors">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-500 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <div className="text-gray-400 leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: AccordionItemProps[];
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
}
