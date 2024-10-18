import { getAllRegions } from ".";

export const fetchGetAllRegions = async (): Promise<any> => {
  try {
    const response = await getAllRegions();
    if (Array.isArray(response) && response.length >= 2) {
      const [status] = response;
      if (status === "SUCCESS") {
        return response[1][0];
      } else {
        console.error("Failed to get regions");
      }
    }
  } catch (error) {
    console.error("Failed to get regions", error);
  }

  return { error: true, message: "Failed to get regions" };
};
