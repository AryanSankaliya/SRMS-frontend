import React, { useState, useRef, useEffect, Children } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * CustomSelect - A premium styled dropdown replacement for native <select>.
 * It accepts <option> children just like a regular select, parses them, 
 * and renders a beautiful custom dropdown UI.
 * 
 * Usage:
 * <CustomSelect value={val} onChange={(e) => setVal(e.target.value)} name="mySelect">
 *   <option value="">Select an option</option>
 *   <option value="1">Option 1</option>
 * </CustomSelect>
 */
const CustomSelect = ({ children, value, onChange, name, disabled = false, required = false, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse children to extract options
  const options = Children.toArray(children).map(child => {
    if (child.type === 'option') {
      return {
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
      };
    }
    return null;
  }).filter(Boolean);

  const selectedOption = options.find(opt => String(opt.value) === String(value)) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (option.disabled) return;
    
    // Create a synthetic event object to match native onChange signature
    const syntheticEvent = {
      target: {
        name: name,
        value: option.value
      }
    };
    
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {/* Hidden native input for form submissions/validation if needed */}
      <input type="hidden" name={name} value={value || ""} required={required} />

      {/* Select trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded-lg border transition-all duration-200 bg-white
          ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" : "text-gray-700 hover:border-teal-400 cursor-pointer"}
          ${isOpen ? "border-teal-500 ring-2 ring-teal-100 shadow-sm" : "border-gray-300 shadow-sm"}
        `}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : "Select..."}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "text-teal-500 rotate-180" : "text-gray-400"}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl py-1 max-h-60 overflow-auto custom-scrollbar ring-1 ring-black ring-opacity-5 origin-top animate-in fade-in zoom-in-95 duration-100">
          {options.length === 0 ? (
            <div className="px-4 py-3 border-b text-sm text-gray-500">No options available</div>
          ) : (
            <ul className="py-1">
              {options.map((option, idx) => {
                 const isSelected = String(option.value) === String(value);
                 return (
                  <li
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className={`
                      relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm transition-colors
                      ${option.disabled ? "text-gray-400 bg-gray-50 cursor-not-allowed" : 
                        isSelected ? "bg-teal-50 text-teal-700 font-medium" : "text-gray-700 hover:bg-gray-50"}
                    `}
                  >
                    <span className="block truncate">{option.label}</span>
                    
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <Check className="w-4 h-4" aria-hidden="true" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
