import { FC, useState, ReactNode, useRef, useEffect } from "react";

interface DropdownProps {
  buttonContent: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const Dropdown: FC<DropdownProps> = ({ buttonContent, children, className = "", contentClassName = "py-2" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        {buttonContent}
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 min-w-0 w-fit bg-white rounded-lg shadow-md border border-gray-200 z-50 ${className}`}>
          <div className={contentClassName}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
