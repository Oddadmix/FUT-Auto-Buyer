import { sendUINotification } from "../utils/notificationUtil";
import { getValue } from "./repository";

export const updateFilters = (filters, email = '') => {
  
    const finalFilters = {};
    Object.keys(filters).forEach((key) => {
      if(key && key.toLocaleLowerCase().indexOf('_share') !== -1) {
        finalFilters[key] = filters[key];
      }
    });
    return fetch(atob("aHR0cHM6Ly9mdXQtZmlsdGVycy5kZW1vLmthbmQuY2EvZmlsdGVycw=="), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "REALEMAIL": email.replaceAll("\"","")
        },
        method: "POST",
        body: JSON.stringify(finalFilters),
    })
}

export const saveFilters = () => {
  updateFilters(getValue("filters"), localStorage.getItem("useremail")).then( () => {
    sendUINotification("Changes saved successfully remotly");
  });
}

export const getFilters = ()=>{
  const email = localStorage.getItem("useremail");
  return fetch(atob("aHR0cHM6Ly9mdXQtZmlsdGVycy5kZW1vLmthbmQuY2EvZmlsdGVycw=="), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "REALEMAIL": email.replaceAll("\"","")
    },
    method: "GET",
  });
}