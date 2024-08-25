import { useEffect, useState } from 'react';
import Widget from './Widget';
import AddWidget from './AddWidget';
import Sidebar from './Sidebar';
import { RefreshCcw } from 'lucide-react';
import { DashboardData } from '../data';
import SearchBar from './SearchBar';


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(''); // Manage the active tab state
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
      };

      const getWidgetSuggestions = (): string[] => {
        return dashboardData?.categories?.flatMap((category: any) =>
          category.widgets.map((widget: any) => widget.name)
        ) || [];
      };
      
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
            <div className='flex justify-start items-center gap-4'>
            
                <button onClick={handleRefresh} className="bg-indigo-400 text-white p-2 rounded-xl">
                    <RefreshCcw className='w-4 h-4' />
                </button>
                <button onClick={handleAddCategoryClick} className="bg-indigo-400 text-white p-2 rounded-xl">
                    + Add Category
                </button>
                <div>
                    <AddWidget onAddWidgetClick={handleAddWidgetClick} />
                </div>
                <SearchBar onSearch={handleSearch} suggestions={getWidgetSuggestions()} />
            </div>

            {dashboardData.categories.map(category => (
                <div key={category.id} className='text-left my-8'>
                    <h2 className='font-bold py-4 px-1 text-lg'>{category.name}</h2>
                    <div className='flex justify-start gap-4 flex-wrap'>
                    {category.widgets.map((widget: any) => {
              const isHighlighted = searchQuery && widget.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
                        console.log("High", isHighlighted);
              return (
                <Widget
                  key={widget.id}
                  widgetName={widget.name}
                  widgetContent={widget.content}
                  isHighlighted={isHighlighted}
                />
              );
            })}
            <div className='border bg-white p-4 rounded-2xl w-full sm:w-1/2 md:w-1/4 flex justify-center items-center'>
            <AddWidget onAddWidgetClick={handleAddWidgetClick} />
            </div>
                       
                        {isSidebarOpen && <Sidebar data={dashboardData} activeTab={activeTab} onClose={handleCloseSidebar} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
