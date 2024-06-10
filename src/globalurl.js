// const currentAddress = window.location.hostname; // Retrieves the current route's hostname/address
// const currentPort =  window.location.port; // Retrieves the current route's port
// const routeURL = `https://${currentAddress}:${currentPort}`;
// export const URLs = {
//     backend: `https://api-asia-backend.appletronics.com.ph:2031`,     //Online Port 8009
//     frontend: routeURL,
//     socketIO: `https://socket2.appletronics.com.ph:3333`    //Online Port 84 
//     //Address http://appletronics.com.ph:84
//   };
  
const currentAddress = window.location.hostname; // Retrieves the current route's hostname/address
const currentPort =  window.location.port; // Retrieves the current route's port
const routeURL = `http://${currentAddress}:${currentPort}`;
export const URLs = {
    backend: `http://${currentAddress}:8009`,     //Online Port 8009
    frontend: routeURL,
    socketIO: `http://${currentAddress}:3333`    //Online Port 84
                                             //Address http://appletronics.com.ph:84
  };
  