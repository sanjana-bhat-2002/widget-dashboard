import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import WidgetForm from './WidgetForm';
import { Tabs, Tab } from './Tabs';
import { DashboardData } from '../data';
import { removeWidget } from '../lib/utils';

interface SidebarProps {
    onClose: () => void;
    activeTab: string;
    data: DashboardData;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, activeTab, data }) => {
    const [selectedTab, setSelectedTab] = useState(activeTab); 
    const [nestedTab, setNestedTab] = useState(data.categories[0].name);
    const [removedWidgets, setRemovedWidgets] = useState<{ [key: string]: boolean }>({}); 
    
    const handleClick = (categoryId: string, widgetId: string) => {
        removeWidget(widgetId, categoryId);
        setRemovedWidgets(prevState => ({
            ...prevState,
            [widgetId]: true,
        }));
    };

    return (
        <div className="fixed top-0 right-0 w-full sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg z-50 p-2">
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
                        <Tabs selectedTab={nestedTab} onTabChange={setNestedTab}>
                            {data.categories.map(category => (
                            <Tab label={category.name} key={category.id}>
                                <div>
                                {category.widgets
                                    .filter(widget => !removedWidgets[widget.id]) 
                                    .map(widget => (
                                    <div
                                        key={widget.id}
                                        className='flex justify-between items-center gap-4 mr-6 border p-3 rounded-2xl my-4'
                                    >
                                        <p>{widget.name}</p>
                                        {removedWidgets[widget.id] ? (
                                            <div className="flex items-center gap-2 text-green-500">
                                                <Check className="w-5 h-5" />
                                                Removed
                                            </div>
                                        ) : (
                                            <button
                                                className='flex justify-center items-center text-xs text-gray-600 gap-2'
                                                onClick={() => handleClick(category.id, widget.id)}
                                            >
                                                Remove
                                                <X className='w-5 h-5 text-red-500' />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                </div>
                            </Tab>
                            ))}
                        </Tabs>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Sidebar;
