// note : BU 26 nov 23 3am before making changes to searchbox component with tanstack query. I am adding loader props

import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelectDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../store/slices/filterSlice";

function ViMultiSelectDropdown({
  options,
  onSelectionChange,
  opnsSelected,
  keey,
}) {
  const { filterdata } = useSelector((state) => state.filters.data);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // if (opnsSelected?.length > 0) {
    //   setFilteredOptions((options) => [...options, opnsSelected]);
    //   return;
    // }
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (opnsSelected?.length > 0) {
      setSelectedOptions(opnsSelected);
    } else {
      setSelectedOptions(options);
    }
  }, [opnsSelected, options]);

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

  const toggleOption = (e) => {
    const opn = e.target.value;
    const slctd = e.target.checked;

    const included = selectedOptions.includes(opn);
    let newSlctdOpns;

    if (included && slctd) return;
    if (!included && slctd) {
      newSlctdOpns = [...selectedOptions, opn];
    }
    if (included && !slctd) {
      newSlctdOpns = selectedOptions.filter((item) => item !== opn);
    }

    setSelectedOptions(newSlctdOpns);
  };

  const handleCancel = () => {
    setSelectedOptions(options);
    setIsOpen(false);
  };

  const handleApply = () => {
    const data = { ...filterdata, [keey]: selectedOptions };

    dispatch(applyFilters(data));
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
        {selectedOptions?.length === 1
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
                checked={selectedOptions.length === filteredOptions.length}
                onChange={toggleSelectAll}
              />
              <span>Select All</span>
            </label>
            {filteredOptions?.map((option) => (
              <label key={option} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => toggleOption(e)}
                  // disabled={filteredOptions.length === 0}
                  value={option}
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

export default ViMultiSelectDropdown;
