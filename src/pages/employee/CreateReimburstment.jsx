import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
const CreateReimbursement = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        expenseDate: "",
        amount: "",
        categoryId: "",
        description: "",
        receipt: null

    })

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        setForm((prev) => ({
            ...prev, 
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); 

        try {
            const formData = new FormData();

            formData.append("ExpenseDate", form.expenseDate);
            formData.append("Amount", form.amount);
            formData.append("CategoryId", form.categoryId);
            formData.append("Description", form.description);

            if(form.receipt)
            {
                formData.append("ReceiptAttachment", form.receipt);
            }

            await api.post("/Reimburstment", formData);
            navigate("/employee/reimburstment");

        } catch (error) {
            setError("Gagal submit data!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4" >
                Submit Reimburstment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1" >Expense Date</label>
                    <input 
                        type="date"
                        name="expenseDate"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1"  >Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1"  >Category</label>
                    <select name="categoryId" id="" className="w-full border p-2 rounded cursor-pointer" onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="1">Transport</option>
                        <option value="2">Meals</option>
                        <option value="3">Accomodation</option>
                    </select>
                </div>
                <div>
                    <label  className="block mb-1" >Description</label>
                    <textarea name="description" id="" className="w-full border p-2 rounded" onChange={handleChange}/>
                </div>
                <div>
                    <label  className="block mb-1">Receipt</label>
                    <input type="file" 
                        name="receipt"
                        className="w-full border p-2 rounded cursor-pointer"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" >
                    {loading ? "Submiting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default CreateReimbursement;