// api.js

// Function to fetch a new avatar from an external API
const fetchAvatar = async () => {
    try {
        // Make a fetch request to the API endpoint
        const response = await fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch avatar');
        }
        
        // Extract the response data as text
        const data = await response.text();
        
        // Return the fetched avatar data
        return data;
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error(error);
        return null;
    }
};

// Export the fetchAvatar function for use in other files
export { fetchAvatar };
