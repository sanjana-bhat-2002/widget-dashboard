interface AddWidgetProps {
    onAddWidgetClick: () => void;
  }

const AddWidget = ({ onAddWidgetClick }: AddWidgetProps) => {
    
    return (
      <div 
      className="bg-white border p-2 flex justify-center items-center rounded-2xl w-full cursor-pointer max-w-52"
      onClick={onAddWidgetClick}
      >
          <h3 className="font-bold text-gray-500">+ Add Widget</h3>
          
      </div>
    )
  }
  
  export default AddWidget