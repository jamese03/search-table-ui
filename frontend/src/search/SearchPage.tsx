import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router";

const SearchPage: React.FC = () => {
    const [filters, setFilters] = useState({ name: "", age: "", country: "" });
    const handleFilterChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };
    const navigate = useNavigate();

    const handleSearch = () => {
        const { name, age, country } = filters;

        if (!name && !age && !country) {
            alert("Please fill at least one field");
            return;
        }
        const queryParams = new URLSearchParams({
            age: age,
            name: name,
            country: country
        }).toString();
        navigate(`results?${queryParams}`);
    };

    return (
        <div>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                        style={{ padding: "0.5rem", marginRight: "1rem" }}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => handleFilterChange("age", e.target.value)}
                        style={{ padding: "0.5rem", marginRight: "1rem" }}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        onChange={(e) => handleFilterChange("country", e.target.value)}
                        style={{ padding: "0.5rem", marginRight: "1rem" }}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default SearchPage