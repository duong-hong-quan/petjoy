import { ref, set, get, update, remove, child } from "firebase/database";
import { database } from "@/firebase/firebase";

// Create Entity
export const createEntity = async (path: string, data: any) => {
  try {
    const entityRef = ref(database, path);
    await set(entityRef, data);
    console.log("Entity created successfully");
  } catch (error) {
    console.error("Error creating entity:", error);
  }
};
export const filterData = (data: any, field: string, value: any) => {
  const filteredData = Object.entries(data).filter(([key, obj]: any) => {
    return obj[key] === value;
  });
  return Object.fromEntries(filteredData);
};
// Get Entity
export const getEntity = async (path: string) => {
  try {
    const entityRef = ref(database, path);
    const snapshot = await get(entityRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting entity:", error);
    return null;
  }
};

// Update Entity
export const updateEntity = async (path: string, data: any) => {
  try {
    const entityRef = ref(database, path);
    await update(entityRef, data);
    console.log("Entity updated successfully");
  } catch (error) {
    console.error("Error updating entity:", error);
  }
};

// Delete Entity
export const deleteEntity = async (path: string) => {
  try {
    const entityRef = ref(database, path);
    await remove(entityRef);
    console.log("Entity deleted successfully");
  } catch (error) {
    console.error("Error deleting entity:", error);
  }
};

// // Example usage
// const exampleUsage = async () => {
//   const userId = "user123";
//   const userPath = `users/${userId}`;

//   // Create a new user
//   await createEntity(userPath, { name: "John Doe", age: 30 });

//   // Get the user
//   const user = await getEntity(userPath);
//   console.log("User data:", user);

//   // Update the user
//   await updateEntity(userPath, { age: 31 });

//   // Delete the user
//   await deleteEntity(userPath);
// };

// exampleUsage();
