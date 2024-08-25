import React, { ReactElement, ReactNode, MouseEvent } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}


const Tabs: React.FC<TabsProps> = ({ children, selectedTab, onTabChange }) => {
  
  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    newActiveTab: string,
  ) => {
    e.preventDefault();
    onTabChange(newActiveTab);
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300 dark:border-border-dark">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              selectedTab === child.props.label ? "border-b-2 border-gray-900" : ""
            } flex text-left text-gray-700 dark:text-text-primary-dark w-1/2 font-medium p-2`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4 transition-opacity duration-900 ease-in-out">
        {children.map((child) => (
          <div
            key={child.props.label}
            className={`${
              child.props.label === selectedTab
                ? "opacity-100"
                : "opacity-0 h-0 overflow-hidden"
            } transition-all duration-900`}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

// Tab Component
const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export { Tabs, Tab };
