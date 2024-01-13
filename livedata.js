// Function to make API requests
async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

// Function to handle live data updates
function handleLiveData() {
    const liveDataContainer = document.getElementById('livedata');
    let i = 0;
    const checkLiveDataUpdates = async () => {
        const liveData = await fetchData('https://hacker-news.firebaseio.com/v0/updates.json');
        if (liveData && liveData.items) {
            const updatedItems = liveData.items;
            const storyId = updatedItems[i];
            const story = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);

            //Notify user of updated items
            const notification = document.createElement('p');
            notification.innerHTML = `
            <p class='newHead'>New Message ${i+1}</p>
            <p class='newMsg'>${story.text}</p>`;
            liveDataContainer.appendChild(notification);
        }
        i++;
    };
    setInterval(checkLiveDataUpdates, 5000);
}

// Handle live data
handleLiveData();