import { useState } from "react";
import dashboardData from "./data.json"
import { addWidget } from "../lib/utils";
import { Check } from "lucide-react";

const WidgetForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        content: "",
        categoryId: ""
      })
    const [buttonText, setButtonText] = useState("Add Widget")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        addWidget(formData)
        setButtonText("Widget Added!")
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <p>Enter Widget Details</p>
            <input onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} name="widget-name" type="text" placeholder='Widget Name' className="border rounded-sm p-2 my-4" />
            <input onChange={(e) => setFormData({...formData, content: e.target.value})} value={formData.content} name="widget-content" type="text" placeholder='Widget Content' className="border rounded-sm p-2" />

            <label htmlFor="Categories" className="mt-4 p-2">Choose a category:</label>
            <select onChange={(e) => setFormData({...formData, categoryId: e.target.value})} value={formData.categoryId} name="Categories" className=" rounded-sm p-2 border">
                <option value="" disabled>Select Category</option>
                {dashboardData.categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button className="bg-black text-white my-12 p-3 rounded-lg flex items-center justify-center gap-2">
        {buttonText === "Widget Added!" && <Check className="w-5 h-5 text-green-500"/>}
        {buttonText}
      </button>
        </form>
    )
}

export default WidgetForm