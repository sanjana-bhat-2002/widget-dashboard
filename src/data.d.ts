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

export {DashboardData}