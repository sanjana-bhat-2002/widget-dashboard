interface WidgetProps {
  widgetName: string;
  widgetContent: string;
  isHighlighted: boolean;
}

const Widget = ({ widgetName, widgetContent, isHighlighted }: WidgetProps) => {
  return (
    <div
      className={`border bg-white px-4 pt-2 pb-16 rounded-2xl w-full shadow-sm sm:w-1/2 md:w-1/4 ${
        isHighlighted ? 'border-blue-500' : ''
      }`}
    >
        <h3 className="font-bold mb-8">{widgetName}</h3>
        <p>{widgetContent}</p>
    </div>
  )
}

export default Widget