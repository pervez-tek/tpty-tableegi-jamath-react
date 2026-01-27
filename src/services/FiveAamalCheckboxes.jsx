import React from "react";

function FiveAamalCheckboxes({ value = [], onChange }) {
  const _5Aamal = [
    { id: "all-5", name: "all-5", label: "-- All --", value: 0 },
    { id: "masjid-war-jamath", name: "masjid-war-jamath", label: "MasjidWarJamath", value: 1 },
    { id: "taleem", name: "taleem", label: "Taleem", value: 2 },
    { id: "5ghanta", name: "2.5ghanta", label: "2.5 Ghanta", value: 3 },
    { id: "gust", name: "gust", label: "Gust", value: 4 },
    { id: "3din", name: "3din", label: "3 Din", value: 5 }
  ];

  const handleCheck = (e) => {
    const { value: val, checked, name } = e.target;
    let newValues = [...value];

    if (checked) {
      newValues.push(Number(val));   // 👈 store numeric value
    } else {
      newValues = newValues.filter((v) => v !== Number(val));
    }

    if (name === "all-5") {
      // If "All" is checked → include all numeric values
      newValues = checked ? _5Aamal.map((opt) => opt.value) : [];
    } else {
      const allSelected = _5Aamal
        .filter((opt) => opt.name !== "all-5")
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
      {_5Aamal.map((opt) => (
        <div className="form-check" key={opt.id}>
          <input
            type="checkbox"
            id={opt.id}
            name={opt.name}
            className="form-check-input"
            checked={value.includes(opt.value)}
            onChange={handleCheck}
            value={opt.value}   // 👈 numeric value
          />
          <label className="form-check-label" htmlFor={opt.id}>
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FiveAamalCheckboxes;
