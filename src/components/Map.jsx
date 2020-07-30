import React, { useEffect, useState, useRef } from "react";
import { useMapDispatch } from "../map-context";

const GoogleMap = ({ apiKey, onMapInit }) => {
   const [isMapLoaded, setIsMapLoaded] = useState(false);
   const dispatch = useMapDispatch();
   const mapRef = useRef(null);

   const init = async () => {
      try {
         await loadSDK();
         await initMap();

         return true;
      } catch (e) {
         throw e;
      }
   }
   const loadSDK = () => new Promise((resolve, reject) => {
      if (isMapLoaded) {
         reject('SDK already loaded');
         return;
      }

      if (navigator.onLine) {
         injectSDK().then(res => resolve(true)).catch(reject);
         return;
      }

      reject('No internet connection')
   })
   const injectSDK = () => new Promise((resolve, reject) => {
      window["mapInit"] = () => {
         setIsMapLoaded(true);
         resolve(true);
      }

      const script = document.createElement('script');
      script.id = 'googleMaps';


      if (apiKey) {
         script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
      } else {
         script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      script.onerror = (ev) => {
         if (typeof ev === 'string') {
            reject(ev);
         }

         reject('Error loading script');
      }

      document.body.appendChild(script);
   })
   const initMap = () => new Promise((resolve, reject) => {
      if (navigator.geolocation.getCurrentPosition) {
         navigator.geolocation.getCurrentPosition((position) => {
            const latLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const mapOptions = {
               center: latLng,
               zoom: 15
            };

            const map = new window.google.maps.Map(mapRef.current, mapOptions);
            const id = Math.random().toString(32);
            dispatch({ type: "SET_MAP", payload: { id, map } });

            onMapInit(id);

         }, reject, { enableHighAccuracy: true })
         return;
      }

      reject('Could not initialise map');
   })


   useEffect(() => {
      const initGoogleMap = async () => {
         try {
            await init();
         } catch (e) {
            console.log(e);
         }
      }

      initGoogleMap();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <><div style={{ height: "500px", width: "100%" }} ref={mapRef} id="google-map"></div></>
}

export default GoogleMap;