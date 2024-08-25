import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dashboardData from "../components/data.json"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const storeData = () => {
  const storedData = localStorage.getItem('dashboardData');
  if (!storedData) {
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    console.log('Data stored in localStorage');
  } else {
    console.log('Data already exists in localStorage');
  }
} 

interface WidgetData {
  name: string;
  content: string;
  categoryId: string;
}

const addWidget = (newWidget: WidgetData) => {
  const storedData = localStorage.getItem('dashboardData');

  if (!storedData) {
    console.error('No data found in localStorage.');
    return;
  }

  const dashboardData = JSON.parse(storedData);

  const category = dashboardData.categories.find(
    (cat: any) => cat.id === newWidget.categoryId
  );

  if (!category) {
    console.error('Category not found.');
    return;
  }

  const newWidgetId = `widget-${category.widgets.length + 1}`;
  const newWidgetData = {
    id: newWidgetId,
    name: newWidget.name,
    content: newWidget.content,
  };


  category.widgets.push(newWidgetData);

  localStorage.setItem('dashboardData', JSON.stringify(dashboardData));

  console.log('Data updated successfully in localStorage.');

};


const removeWidget = (widgetId: string, categoryId: string) => {
  const storedData = localStorage.getItem('dashboardData');

  if (!storedData) {
    console.error('No data found in localStorage.');
    return;
  }

  const dashboardData = JSON.parse(storedData);

  const category = dashboardData.categories.find(
    (cat: any) => cat.id === categoryId
  );

  if (!category) {
    console.error('Category not found.');
    return;
  }

  const widgetIndex = category.widgets.findIndex(
    (widget: any) => widget.id === widgetId
  );

  if (widgetIndex === -1) {
    console.error('Widget not found.');
    return;
  }

  category.widgets.splice(widgetIndex, 1);

  localStorage.setItem('dashboardData', JSON.stringify(dashboardData));

  console.log('Widget removed successfully from localStorage.');
};


export { storeData, addWidget, removeWidget}