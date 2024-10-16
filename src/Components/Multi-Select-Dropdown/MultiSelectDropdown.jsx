import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelectDropdown.module.css";

function MultiSelectDropdown({ options, onSelectionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleOption = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
  };

  const handleCancel = () => {
    setSelectedOptions(filteredOptions);
    setIsOpen(false);
  };

  const handleApply = () => {
    onSelectionChange(selectedOptions);
    setIsOpen(false);
  };

  const toggleSelectAll = () => {
    if (selectedOptions.length < filteredOptions.length) {
      setSelectedOptions(filteredOptions);
    } else {
      setSelectedOptions([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length === 1
          ? selectedOptions[0]
          : selectedOptions.length > 1
          ? `Selected (${selectedOptions.length})`
          : "Select Options"}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownContents}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.dropdownSearch}
            />
            <label className={styles.dropdownItem}>
              <input
                type="checkbox"
                checked={
                  selectedOptions.length === filteredOptions.length &&
                  filteredOptions.length > 0
                }
                onChange={toggleSelectAll}
              />
              <span>Select All</span>
            </label>
            {filteredOptions.map((option) => (
              <label key={option} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                  disabled={filteredOptions.length === 0}
                />
                <span>{option}</span>
              </label>
            ))}
            <div className={styles.dropdownActions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.applyButton} onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
