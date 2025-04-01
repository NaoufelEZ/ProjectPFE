import { useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { APIURL, ApiKey } from "../Api/Api";

const useDeleteItem = () => {
  const deleteItem = useCallback(async (id, endpoint, token, onSuccess) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${APIURL}/${endpoint}/${id}`, {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": ApiKey,
            },
          });

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            if (onSuccess) {
              onSuccess(); 
            }
          });

        } catch (error) {
          console.error("Error deleting:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error"
          });
        }
      }
    });
  }, []);

  return deleteItem;
};

export default useDeleteItem;
