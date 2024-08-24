import React, { useState } from 'react';
import { X } from 'lucide-react';
import WidgetForm from './WidgetForm';
import { Tabs, Tab } from './Tabs';

interface SidebarProps {
    onClose: () => void;
    activeTab: string; // Accept activeTab as a prop
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, activeTab }) => {
    const [selectedTab, setSelectedTab] = useState(activeTab); // Set the default active tab

    return (
        <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50">
            <div className="p-4">
                <button
                    className="text-black font-bold flex justify-center items-center gap-3 my-4"
                    onClick={onClose}
                >
                    <X className='w-5 h-5 text-red-500' />
                    Close
                </button>
                <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
                    <Tab label="Add Widget">
                        <h2 className="font-bold text-xl mb-4">Add a Widget</h2>
                        <WidgetForm />
                    </Tab>
                    <Tab label="Categories">
                        <div>Categories here</div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Sidebar;
