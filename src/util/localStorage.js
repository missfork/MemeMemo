const localStorageUtil = {
    // Save data to localStorage
    setItem: (key, value) => {
        try {
            console.log("sett")
            localStorage.setItem(key, JSON.stringify(value));
            console.log("sett")
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    },

    // Retrieve data from localStorage
    getItem: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
            return null;
        }
    },

   
    clearStorage: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
};

export default localStorageUtil;
