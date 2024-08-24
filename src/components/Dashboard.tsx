import { useEffect, useState } from 'react';
import Widget from './Widget';
import AddWidget from './AddWidget';
import Sidebar from './Sidebar';
import { RefreshCcw } from 'lucide-react';

interface Widget {
    id: string;
    name: string;
    content: string;
}

interface Category {
    id: string;
    name: string;
    widgets: Widget[];
}

interface DashboardData {
    categories: Category[];
}

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(''); // Manage the active tab state
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    const handleAddWidgetClick = () => {
        setActiveTab('Add Widget');
        setIsSidebarOpen(true);
    };

    const handleAddCategoryClick = () => {
        setActiveTab('Categories');
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleRefresh = () => {
        loadDashboardData();
    };

    const loadDashboardData = () => {
        const storedData = localStorage.getItem('dashboardData');
        if (!storedData) {
            console.error('No data found in localStorage.');
            return;
        }

        const parsedData: DashboardData = JSON.parse(storedData);
        setDashboardData(parsedData);
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='flex justify-end items-center gap-4'>
                <button onClick={handleRefresh} className="bg-blue-500 text-white p-2 rounded-lg">
                    <RefreshCcw className='w-4 h-4' />
                </button>
                <button onClick={handleAddCategoryClick} className="bg-blue-500 text-white p-2 rounded-lg">
                    + Add Category
                </button>

                <div>
                    <AddWidget onAddWidgetClick={handleAddWidgetClick} />
                </div>
            </div>

            {dashboardData.categories.map(category => (
                <div key={category.id} className='text-left my-8'>
                    <h2>{category.name}</h2>
                    <div className='flex justify-start gap-4'>
                        {category.widgets.map(widget => (
                            <Widget key={widget.id} widgetName={widget.name} widgetContent={widget.content} />
                        ))}
                        <AddWidget onAddWidgetClick={handleAddWidgetClick} />
                        {isSidebarOpen && <Sidebar activeTab={activeTab} onClose={handleCloseSidebar} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
