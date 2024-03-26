import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Pages/Home";
import Avtopark from "./Pages/Avtopark";
import List from "./Pages/List";
import Offer from "./Pages/Offer";
import Feed from "./Pages/Feed";
import OldOffer from "./Pages/OldOffer";
import Preloader from "./Components/Preloader";

function App() {
  const preloader = useSelector((state) => state.cars.preloader);

  window.addEventListener('message', function (event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
      /* print to the console on submit, or add in custom redirect in here */
      console.log('onFormSubmit');
      console.log(event);
        window.dataLayer = window.dataLayer || []; 
        window.dataLayer.push({
        event: 'popupFormOrderTestDrive',
        });
    }
  });


  return (
    <div className="App">
    
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Avtopark />} />
        <Route path="/list" element={<List />} />
        <Route path="/offer/:id" element={<Offer />} />
        {/* <Route path="/feed" element={<Feed />} /> */}
        {/* <Route path="/offer-old/:id" element={<OldOffer />} /> */}
      </Routes>
      {preloader && <Preloader />}
      
    </div>
  );
}



export default App;
