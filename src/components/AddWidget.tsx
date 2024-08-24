interface AddWidgetProps {
    onAddWidgetClick: () => void;
  }

const AddWidget = ({ onAddWidgetClick }: AddWidgetProps) => {
    
    return (
      <div 
      className="border p-2 rounded-lg w-full cursor-pointer"
      onClick={onAddWidgetClick}
      >
          <h3 className="font-bold text-gray-500">+ Add Widget</h3>
          
      </div>
    )
  }
  
  export default AddWidget