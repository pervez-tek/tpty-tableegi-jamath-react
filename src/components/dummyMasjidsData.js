// Dummy masjid data
export const initialMasjidsList = [
  { id: "", halkaNo: "1", masjidName: "Masjid-e-Quba", address: "Hyderabad, Telangana" },
  { id: "", halkaNo: "2", masjidName: "Masjid Noor", address: "Tirupati, Andhra Pradesh" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Bilal", address: "Bengaluru, Karnataka" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Madina", address: "Chennai, Tamil Nadu" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Rehmat", address: "Mumbai, Maharashtra" },


  { id: "", halkaNo: "1", masjidName: "Masjid-e-Aqsa", address: "Delhi" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Huda", address: "Bengaluru, Karnataka" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Rahman", address: "Mumbai, Maharashtra" },
  { id: "", halkaNo: "2", masjidName: "Masjid-e-Safa", address: "Vijayawada, Andhra Pradesh" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Taqwa", address: "Chennai, Tamil Nadu" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Firdous", address: "Hyderabad, Telangana" },
  { id: "", halkaNo: "2", masjidName: "Masjid Noor-ul-Islam", address: "Nellore, Andhra Pradesh" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Anwar", address: "Mysuru, Karnataka" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Mustafa", address: "Coimbatore, Tamil Nadu" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Barkat", address: "Thane, Maharashtra" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Quba", address: "Hyderabad, Telangana" },
  { id: "", halkaNo: "2", masjidName: "Masjid Noor", address: "Vijayawada, Andhra Pradesh" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Rahman", address: "Itanagar, Arunachal Pradesh" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Salam", address: "Guwahati, Assam" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Taqwa", address: "Patna, Bihar" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Farooq", address: "Raipur, Chhattisgarh" },
  { id: "", halkaNo: "2", masjidName: "Masjid-e-Aqsa", address: "Panaji, Goa" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Huda", address: "Ahmedabad, Gujarat" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Anwar", address: "Gurugram, Haryana" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Bilal", address: "Shimla, Himachal Pradesh" },

  { id: "", halkaNo: "2", masjidName: "Masjid-e-Rizwan", address: "Srinagar, Jammu & Kashmir" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Siddiq", address: "Ranchi, Jharkhand" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Ibrahim", address: "Bengaluru, Karnataka" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Noorani", address: "Thiruvananthapuram, Kerala" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Kausar", address: "Bhopal, Madhya Pradesh" },
  { id: "", halkaNo: "2", masjidName: "Masjid-e-Rehmat", address: "Mumbai, Maharashtra" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Zahra", address: "Imphal, Manipur" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Firdous", address: "Shillong, Meghalaya" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Hamza", address: "Aizawl, Mizoram" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Barkat", address: "Kohima, Nagaland" },
  { id: "", halkaNo: "2", masjidName: "Masjid-e-Safa", address: "Bhubaneswar, Odisha" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Madina", address: "Amritsar, Punjab" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Umar", address: "Jaipur, Rajasthan" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Mustafa", address: "Gangtok, Sikkim" },

  { id: "", halkaNo: "1", masjidName: "Masjid-e-Rahmatullah", address: "Chennai, Tamil Nadu" },
  { id: "", halkaNo: "2", masjidName: "Masjid-e-Usman", address: "Agartala, Tripura" },
  { id: "", halkaNo: "3", masjidName: "Masjid-e-Ali", address: "Lucknow, Uttar Pradesh" },
  { id: "", halkaNo: "4", masjidName: "Masjid-e-Hidayat", address: "Dehradun, Uttarakhand" },
  { id: "", halkaNo: "5", masjidName: "Masjid-e-Nur", address: "Kolkata, West Bengal" }

];

export const hugeMasjidsList = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  masjidName: i % 2 === 0 ? "Masjid-e-Quba-" + i : "Masjid-e-Bilal-" + i,
  halkaNo: i % 2 === 0 ? 1 : 2,
  address: i % 2 === 0 ? "Bengaluru, Karnataka" : "Mumbai, Maharashtra"
}));

// Utility functions for CRUD operations on dummy data
export const addDummyMasjid = (list, masjid) => [...list, masjid];

export const updateDummyMasjid = (list, index, updatedMasjid) => {
  const newList = [...list];
  newList[index] = updatedMasjid;
  return newList;
};

export const deleteDummyMasjid = (list, index) => list.filter((_, i) => i !== index);
