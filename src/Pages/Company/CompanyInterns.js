import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import { GetWithAuth } from "../../Services/HttpService";
import './CompanyInterns.css';

function CompanyInterns() {
    const [currentUser, setCurrentUser] = useState({});
    const [interns, setInterns] = useState([]);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('Select file');

    
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
                const result = await response.json();
                console.log(result);
                setCurrentUser(result);
                await fetchInterns(result);
            } catch (error) {
                console.log(error);
                console.log("User not found");
            }
        };

        const fetchInterns = async (user) => {
            try {
                const response = await GetWithAuth("/company/" + user.companyid + "/interns");
                const result = await response.json();
                console.log(result);
                setInterns(result);
            } catch (error) {
                console.log(error);
                console.log("application not found");
            }
        };

        fetchCompany();
    }, []);

    const handleSelectIntern = (intern) => {
        if (selectedIntern === intern && !uploading) {
            setSelectedIntern(null);
        } else {
            setSelectedIntern(intern);
        }
    };

    const handleUploadClick = (e) => {
        e.stopPropagation(); // Prevents the onClick event of the parent div from being triggered
        setUploading(!uploading); // Toggle uploading state based on current state
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
          setFileName(selectedFile.name);
        }
      };

    const downloadForm = () => {
        downloadApplicationForm();
    };

    const handleSubmitUpload = (e) => {
        e.stopPropagation(); 
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        if (!(fileName.endsWith('.docx') || fileName.endsWith('.doc') || fileName.endsWith('.pdf'))) {
            alert('Please select a word/pdf file!');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', selectedFile);

        uploadApplicationForm(formData);
        setUploading(false);
        setSelectedFile(null);
    };

    const handleCancelUpload = (e) => {
        e.stopPropagation(); 
        setUploading(false);
        setSelectedFile(null);
    };

    const downloadApplicationForm = () => {
        fetch("/company/" + currentUser.companyid + "/downloadApplicationForm?studentId=" + selectedIntern.studentId, {
          method: 'GET',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response.blob(); // Yanıtı blob olarak al
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
          const a = document.createElement('a'); // Yeni bir anchor elementi oluştur
          a.href = url;
          a.download = "ApplicationForm_" + selectedIntern.studentId + ".docx"; // İndirilecek dosyanın adını belirle
          document.body.appendChild(a); // Anchor elementini document'e ekle
          a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
          a.remove(); // Anchor elementini temizle
          window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
          alert(`Application Form downloaded successfully`);
        })
        .catch(err => {
          console.error("Error occurred:", err);
          alert(`Application Form download is unsuccessful`);
        });
      };

      const uploadApplicationForm = (formData) => {
        fetch("/company/" + currentUser.companyid + "/uploadApplicationForm?studentId=" + selectedIntern.studentId, {
          method: 'POST',
          body: formData,
          headers: {
            // Don't set 'Content-Type': 'multipart/form-data',
            // Fetch will set it automatically along with the boundary
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response;
        })
        .then(result => {
          console.log(result);
          alert("Application form uploaded successfully");
          setSelectedFile(null);
          setFileName('Select file');
          setUploading(false);
          window.location.reload();
        })
        .catch(err => {
          console.error("Error occurred:", err);
          alert("Application form upload is unsuccessful.");
        });
      }

    return (
        <CompanyHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>My Interns</h1>
            </div>
            {interns.length > 0 ? (
                interns.map((intern) => (
                    <div key={intern.studentId} className="announcement-section" onClick={() => handleSelectIntern(intern)} style={{ cursor: 'pointer' }}>
                        <h2>{intern.studentName}<span style={{ float: 'right', fontSize: '15px' }}>Status: {intern.applicationStatus}</span></h2>
                        {selectedIntern === intern && (
                            <div>
                                <button onClick={downloadForm}>Download Form</button><br />
                                {intern.applicationStatus === "Application Form Sent to Company" && (
                                    <div>
                                        <button onClick={handleUploadClick}>Upload Form</button>
                                        {uploading && (
                                            <div className="modal">
                                                <form onSubmit={handleSubmitUpload}>
                                                    <div className="modal-content">
                                                        <div className="modal-buttons-container">
                                                            <div>
                                                                <label htmlFor="fileInput" className='button' style={{ 
                                                                    background: '#4CAF50',
                                                                    color: 'white',
                                                                    padding: '10px 20px',
                                                                    width: '20%',
                                                                    cursor:'pointer',
                                                                    borderRadius:'4px'
                                                                }}>
                                                                    Choose Application Form
                                                                    <input type="file" id="fileInput" style={{ display: 'none' }} accept=".docx, .doc, .pdf" onChange={handleFileChange} />
                                                                </label>
                                                                {fileName && <span style={{ marginLeft: '10px' }} className="file-name">{fileName}</span>} {/* Dosya adını göster */}
                                                            </div>
                                                            <label className='button' style={{
                                                                background: '#4CAF50',
                                                                color: 'white',
                                                                padding: '10px 20px',
                                                                width: '4%',
                                                                cursor:'pointer',
                                                                borderRadius:'4px',
                                                                float:'right'
                                                            }}>
                                                                Send
                                                                <input type='submit' style={{ display: 'none' }}/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className='announcement-section'>
                    <p>No students with partially filled forms. Please check back later.</p>
                </div>
            )}
        </CompanyHome>
    );
}

export default CompanyInterns;
