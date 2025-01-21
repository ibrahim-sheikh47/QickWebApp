import React, { useState, useRef } from "react";

const PopupMenu = ({
  trigger, // Element that triggers the popup
  menuItems, // Array of menu items
  onItemClick, // Callback for menu item click
  position = { top: "40px", right: "0px" }, // Default positioning
  customStyles = {}, // Custom styles for the popup
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="popup-menu-container" style={{ position: "relative" }}>
      <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="popup-menu"
          style={{
            position: "absolute",
            ...position,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            padding: "10px",
            zIndex: 1000,
            ...customStyles,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {menuItems.map((item, index) => (
              <li
                key={index}
                style={{ padding: "5px 10px", cursor: "pointer" }}
                onClick={() => {
                  onItemClick && onItemClick(item);
                  closeMenu();
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
