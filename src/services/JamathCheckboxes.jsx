import React from "react";

function JamathCheckboxes({ value = [], onChange }) {
  const jamath = [
    { id: "all", name: "all", label: "-- All --", value: 0 },
    { id: "3days", name: "3days", label: "3 Days", value: 1 },
    { id: "40days", name: "40days", label: "40 Days", value: 2 },
    { id: "4months", name: "4months", label: "4 Months", value: 3 },
    { id: "masthurath", name: "masthurath", label: "Masthurath", value: 4 },
    { id: "behroon", name: "behroon", label: "Behroon", value: 5 }
  ];

  const handleCheck = (e) => {
    const { value: val, checked, name } = e.target;
    let newValues = [...value];

    if (checked) {
      newValues.push(Number(val));   // 👈 store numeric value
    } else {
      newValues = newValues.filter((v) => v !== Number(val));
    }

    if (name === "all") {
      // If "All" is checked → include all numeric values
      newValues = checked ? jamath.map((opt) => opt.value) : [];
    } else {
      const allSelected = jamath
        .filter((opt) => opt.name !== "all")
        .every((opt) => newValues.includes(opt.value));

      if (allSelected && !newValues.includes(0)) {
        newValues.push(0); // ensure "All" (value 0) is included
      } else if (!allSelected) {
        newValues = newValues.filter((v) => v !== 0);
      }
    }

    onChange(newValues);
  };

  return (
    <div className="d-flex flex-column align-items-start">
      {jamath.map((opt) => (
        <div className="form-check" key={opt.id}>
          <input
            type="checkbox"
            id={opt.id}
            name={opt.name}
            className="form-check-input"
            checked={value.includes(opt.value)}   // 👈 check numeric value
            onChange={handleCheck}
            value={opt.value}                     // 👈 numeric value
          />
          <label className="form-check-label" htmlFor={opt.id}>
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default JamathCheckboxes;
