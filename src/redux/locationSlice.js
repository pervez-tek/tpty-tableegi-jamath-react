// import { createSlice } from "@reduxjs/toolkit";

// // Initial state
// const initialState = {
//   selectedCity: "Tirupati"
// };

// const locationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setCity: (state, action) => {
//       state.selectedCity = action.payload;
//     }
//   }
// });

// // Export action
// export const { setCity } = locationSlice.actions;

// // Export reducer
// export default locationSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useLocation } from "react-router-dom";

// ------------------------------
// 🔥 Async Thunk (API call)
// ------------------------------
export const fetchNamazTimings = createAsyncThunk(
    "location/fetchNamazTimings",
    async (city, thunkAPI) => {
        try {
            const response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city.name}&country=${city.country}&method=2&school=1`
            );

            const data = await response.json();
            console.log("Namaz Timings calling");
            return data.data.timings; // return only timings object
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch timings");
        }
    }
);

// ------------------------------
// 🔥 Async Thunk (API call)
// ------------------------------
export const fetchLocationMasjids = createAsyncThunk(
    "location/fetchLocationMasjids",
    async (city, thunkAPI) => {
        try {
            const API_URL = import.meta.env.VITE_BACKEND_URL;
            const api = axios.create({ baseURL: API_URL });

            const location = useLocation();
            const navLoginData = location.state?.loginData;
            // after Login from Admin capturing user login information
            // Try sessionStorage fallback (optional) 
            const stored = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
            const persisted = stored ? JSON.parse(stored) : null;
            const initialLogin = navLoginData ?? persisted ?? { adminUsrTrackingId: "", username: "", sessionid: null, usrAdminId: "", locationId: city.locationId };

            api.get(`${API_URL}/getAllMasjids`, {
                headers: {
                    sessionid: initialLogin.sessionid ?? "",
                    id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                    usrAdminId: initialLogin.usrAdminId ?? null,
                    locationId: initialLogin.locationId ?? null
                },
                withCredentials: true
            }).then((response) => {
                // console.log("Response: from getAllMasjids API =:" + JSON.stringify(response.data));
                console.log("fetchLocationMasjids  calling");
                return response.data;
                // Axios auto-parses JSON 
            }).catch((error) => {
                console.error("Error fetching masjids:", error);
                if (error.code === "ERR_NETWORK") {
                    // Custom handling for network errors                
                    toast.warning("Network error, showing dummy data instead!.");

                } else {
                    // Other errors (e.g. 400/500 from backend)
                    const backendMessage = error.response?.data?.message || error.message;
                    //showNotification(`❌ Error: ${backendMessage}`, "danger");
                    toast.error(`Error: ${backendMessage}`);
                }
            }).finally(() => { });
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch LocationMasjids");
        }
    }
);

// ------------------------------
// Default City Object
// ------------------------------
const defaultCity = {
    id: 1,
    name: "Tirupati",
    state: "Andhra Pradesh",
    country: "India",
    lat: 13.6288,
    lon: 79.4192,
    halka: 5
};

// ------------------------------
// Initial State
// ------------------------------
const initialState = {
    selectedCity: defaultCity,
    timings: null,
    loading: false,
    error: null
};

// ------------------------------
// Slice
// ------------------------------
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.selectedCity = action.payload;
        },

        resetLocation: (state) => {
            state.selectedCity = initialState.selectedCity;
            state.timings = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNamazTimings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNamazTimings.fulfilled, (state, action) => {
                state.loading = false;
                state.timings = action.payload;
            })
            .addCase(fetchNamazTimings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setCity, resetLocation } = locationSlice.actions;

export default locationSlice.reducer;