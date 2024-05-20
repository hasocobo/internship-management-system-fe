import React, { useState, useEffect } from "react";
import "../../Pages/Coordinator/Guidelines.css";
import CoordinatorHome from "./CoordinatorHomeV2.jsx";

export default function GuidelinesV2() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [announcementMade, setAnnouncementMade] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  /*
    app.get('/coordinator/getUploadedGuidelines', (req, res) => {
    });


    app.delete('/coordinator/deleteGuideline/:filename', (req, res) => {
        const filename = req.params.filename;
    });

    */

  useEffect(() => {
    // Fetch the list of uploaded files on component mount
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = () => {
    fetch("/coordinator/getUploadedGuidelines")
      .then((response) => response.json())
      .then((data) => {
        setUploadedFiles(data);
      })
      .catch((error) => {
        console.error("Error fetching uploaded files:", error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a PDF file.");
      event.target.value = null;
    }
  };

  const handleAnnounce = () => {
    if (!file) {
      alert("No file selected. Please choose a PDF file to announce.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    uploadGuideline(formData);

    console.log("File uploaded:", file);
    setAnnouncementMade(true);
    alert("Announcement successfully made.");
  };

  const uploadGuideline = (formData) => {
    fetch("/coordinator/uploadGuidelines", {
      method: "POST",
      body: formData,
      headers: {
        // Don't set 'Content-Type': 'multipart/form-data',
        // Fetch will set it automatically along with the boundary
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        alert("Guideline uploaded successfully");
        setFile(null);
        fetchUploadedFiles(); // Refresh the list of uploaded files
      })
      .catch((err) => {
        console.error("Error occurred:", err);
      });
  };

  const handleCancel = () => {
    setFile(null);
    setPreview("");
  };

  const handleDelete = (filename) => {
    if (window.confirm("Are you sure you want to delete this guideline?")) {
      fetch(`/coordinator/deleteGuideline/${filename}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok: " + response.statusText
            );
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          alert("Guideline deleted successfully");
          fetchUploadedFiles(); // Refresh the list of uploaded files
        })
        .catch((err) => {
          console.error("Error occurred:", err);
        });
    }
  };

  const handleDeleteAnnouncement = () => {
    setAnnouncementMade(false);
    alert("Announcement deleted.");
  };

  return (
    <div className="" style={{ width: "100%", padding: "20px 40px", display: "flex", overflowY: "auto", justifyContent: "center"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          padding: "40px",
          flexGrow: "0",
          overflowY: "auto",
          border: ".5px solid gray",
          borderRadius: "10px",
          boxShadow: "1px 3px 0 rgba(0 0 0 0.6)"
        }}
      >
        <h2 className="upload-title">Please Upload a File (.pdf)</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {file && (
          <div>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <h3>Preview:</h3>
            <iframe
              src={preview}
              title="Document Preview"
              className="preview"
            ></iframe>
          </div>
        )}
        <button style={{ width: "200px" }} onClick={handleAnnounce}>
          Announce
        </button>
        {announcementMade && (
          <div>
            <p>Announcement made.</p>
            <button
              onClick={handleDeleteAnnouncement}
              className="delete-button"
            >
              Delete Announcement
            </button>
          </div>
        )}
        <h3>Uploaded Files:</h3>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file}>
              <a
                href={`/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file}
              </a>
              <button onClick={() => handleDelete(file)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
