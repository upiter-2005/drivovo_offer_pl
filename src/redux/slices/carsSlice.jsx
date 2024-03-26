import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cars: [],
  bg: "",
  preloader: true,
  isLoaded: false,
  mobMnu: false,
  modalForm: false,
  isModal: false,
  isModalSlider: false,
  openPopupCarDinamic: false,
  popupTopFormImage: ''
};

export const getCars = createAsyncThunk("cars/getCars", async () => {
  try {
  
    const { data } = await axios(`${process.env.REACT_APP_PROXY}/cars`);

    return data.data.results;
  } catch (e) {
    console.log(e.message);
  }
});

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setBg: (state, action) => {
      state.bg = action.payload;
    },
    hidePreloader: (state, action)=>{
      state.preloader = false;
    },
    showPreloader: (state, action)=>{
      state.preloader = true;
    },
    openMobMnu: (state, action) => {
      state.mobMnu = true;
      document.querySelector('body').style.overflowY = 'hidden';
    },
    closeMobMnu: (state, action) => {
      state.mobMnu = false;
      document.querySelector('body').style.overflowY = 'auto';
    },
    openModalForm: (state, action) => {
      state.modalForm = true;
      document.querySelector('body').style.overflowY = 'hidden';
    },
    closeModalForm: (state, action) => {
      state.modalForm = false;
      document.querySelector('body').style.overflowY = 'auto';
    },
    openModal: (state, action) => {
      state.isModal = true;
      document.querySelector('body').style.overflowY = 'hidden';
    },
    closeModal: (state, action) => {
      state.isModal = false;
      document.querySelector('body').style.overflowY = 'auto';
    },
    openModalSlider: (state) => {
      state.isModalSlider = true;
      document.querySelector('body').style.overflowY = 'hidden';
    },
    closeModalSlider: (state) => {
      state.isModalSlider = false;
      document.querySelector('body').style.overflowY = 'auto';
    },
    setPopupFormImage: (state, action) =>{
      state.popupTopFormImage = action.payload;
    },
    openDinamic: (state) => {
      state.openPopupCarDinamic = true;
      document.querySelector('body').style.overflowY = 'hidden';
    },
    closeDinamic: (state, action) =>{
      state.openPopupCarDinamic = false;
      document.querySelector('body').style.overflowY = 'auto';
    }
  },
  extraReducers: {
    [getCars.pending]: (state) => {
      //   state.cars = [];
    },
    [getCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
      state.isLoaded = true;
    },
    [getCars.rejected]: (state, action) => {
      //   state.cars = [];
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(getCars.fulfilled, (state, { payload }) => {
  //     state.cars = payload;
  //   }); // <------- HERE
  // },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const {openModal, closeModal, setBg, hidePreloader, showPreloader, openMobMnu, closeMobMnu, openModalForm, closeModalForm, openModalSlider, closeModalSlider, setPopupFormImage,openDinamic, closeDinamic } = carsSlice.actions;
export default carsSlice.reducer;
