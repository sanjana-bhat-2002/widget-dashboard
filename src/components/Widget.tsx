interface WidgetProps {
  widgetName: string;
  widgetContent: string;
}

const Widget = ({ widgetName, widgetContent }: WidgetProps) => {
  return (
    <div className="border p-4 rounded-lg w-1/2 md:w-1/3 ">
        <h3 className="font-bold">{widgetName}</h3>
        <p>{widgetContent}</p>
    </div>
  )
}

export default Widget