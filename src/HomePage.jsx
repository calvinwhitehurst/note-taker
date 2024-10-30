import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [folders, setFolders] = useState([]); // To store folder data
  const [folderItems, setFolderItems] = useState({}); // To store items for each folder
  const [openFolders, setOpenFolders] = useState({}); // To track which folders are expanded

  // Fetch folders from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/folders')
      .then(response => {
        setFolders(response.data); // Set fetched folder data
        console.log('Folders fetched:', response.data); // Debugging: log folder data
      })
      .catch(error => {
        console.error('Error fetching folders:', error);
      });
  }, []);

  // Function to fetch items (notes) for a specific folder only when it's clicked
  const fetchFolderItems = async (folderId) => {
    console.log('Fetching items for folder ID:', folderId); // Debugging: log folder ID

    // If notes for the folder are already fetched, just toggle the open/close state
    if (folderItems[folderId]) {
      setOpenFolders(prevState => ({
        ...prevState,
        [folderId]: !prevState[folderId] // Toggle the open state
      }));
      return;
    }

    // If notes haven't been fetched yet, fetch the notes when the folder is clicked
    try {
      const response = await axios.get(`http://localhost:3000/api/folder-items/${folderId}`);
      console.log('Notes fetched for folder ID:', folderId, response.data); // Debugging: log notes
      setFolderItems(prevState => ({
        ...prevState,
        [folderId]: response.data // Store the notes for the clicked folder
      }));
      setOpenFolders(prevState => ({
        ...prevState,
        [folderId]: true // Open the folder after fetching notes
      }));
    } catch (error) {
      console.error('Error fetching folder items:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">File Folders</h1>

      {/* Card Grid for Folders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {folders.length > 0 ? (
          folders.map(folder => (
            <div
              key={folder.ID}
              className="card bg-base-100 shadow-md cursor-pointer"
              onClick={() => fetchFolderItems(folder.ID)} // Fetch notes when folder is clicked
            >
              <div className="card-body">
                <h2 className="card-title">{folder.folder_name}</h2>
                <p className="text-sm text-gray-500">Last modified: {new Date(folder.date).toLocaleDateString()}</p>
                
                {/* Show items (notes) if the folder is clicked and open */}
                {openFolders[folder.ID] && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Notes:</h3>
                    {folderItems[folder.ID] && folderItems[folder.ID].length > 0 ? (
                      <ul className="list-disc pl-5">
                        {folderItems[folder.ID].map(note => (
                          <li key={note.ID} className="text-sm">{note.note_content}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No notes found in this folder.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No folders found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
