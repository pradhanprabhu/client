import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

   useEffect(() => {
    const fetchRooms = async () => {
       try {
         setLoading(true);
         setError(false);
         const response = await axios.get("/api/rooms/getallrooms");
         setRooms(response.data);
       } catch (error) {
        setError(true);
         console.error("Error fetching rooms:", error);
       } finally {
         setLoading(false);
       }
     };

     fetchRooms();
   }, []);

   return (
     <div className="container">
       <div className="row justify-content-center mt-5">
         {loading ? (
           <h1>Loading....</h1>
         ) : error ? (
           <h1>Error fetching rooms. Please try again.</h1>
         ) : (
           rooms.map((room, index) => (
             <div key={index} className="col-md-9 mt-2">
              <Room room={room} />
             </div>
        ))
         )}
       </div>
     </div>
   );
 }

 export default Homescreen;

