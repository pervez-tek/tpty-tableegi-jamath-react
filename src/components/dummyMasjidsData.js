// Dummy masjid data
export const initialMasjidsList = [
  { id: "", halkaNo: "1", masjidName: "Masjid-e-Quba", address: "Hyderabad, Telangana" },
  { id: "", halkaNo: "2", masjidName: "Masjid Noor", address: "Tirupati, Andhra Pradesh" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Bilal", address: "Bengaluru, Karnataka" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Madina", address: "Chennai, Tamil Nadu" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Rehmat", address: "Mumbai, Maharashtra" }
];

// Utility functions for CRUD operations on dummy data
export const addDummyMasjid = (list, masjid) => [...list, masjid];

export const updateDummyMasjid = (list, index, updatedMasjid) => {
  const newList = [...list];
  newList[index] = updatedMasjid;
  return newList;
};

export const deleteDummyMasjid = (list, index) => list.filter((_, i) => i !== index);
