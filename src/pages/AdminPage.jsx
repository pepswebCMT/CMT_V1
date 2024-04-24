import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import './styles/admin.css';

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editSubmission, setEditSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, "PendingTombs"));
      const sortedSubmissions = querySnapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.submissionDate?.seconds - b.submissionDate?.seconds);
      setSubmissions(sortedSubmissions);
    };

    fetchSubmissions();
  }, []);

const approveSubmission = async (submission) => {
    await addDoc(collection(db, "NewTombs"), submission);
    await deleteDoc(doc(db, "PendingTombs", submission.id));
    setSubmissions(submissions.filter(s => s.id !== submission.id));
};


  

  const rejectSubmission = async (id) => {
    await deleteDoc(doc(db, "PendingTombs", id));
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const startEditing = (submission) => {
    setEditSubmission({ ...submission });
  };

  const handleEditChange = (e) => {
    setEditSubmission({ ...editSubmission, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await setDoc(doc(db, "PendingTombs", editSubmission.id), editSubmission);
    setSubmissions(submissions.map(s => s.id === editSubmission.id ? editSubmission : s));
    setEditSubmission(null);
  };

 /* const handleEditImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(uploadTask.ref);
    setEditSubmission({ ...editSubmission, imageUrl: imageUrl });
  };*/

  return (
    <div>
      {submissions.length > 0 ? (
        submissions.map((submission) => (
          <div key={submission.id} className="submission">
            <h2>{submission.title}</h2>
                  {submission.imageUrl && (
        <img src={submission.imageUrl} alt="" className="submission-image" />
      )}
            <p>{submission.cemetery}</p>
            {editSubmission && editSubmission.id === submission.id ? (
              <div>
                <input
                  type="text"
                  value={editSubmission.title}
                  onChange={(e) => handleEditChange(e)}
                />
                <input
                  type="text"
                  value={editSubmission.cemetery}
                  onChange={(e) => handleEditChange(e)}
                />
                <button onClick={handleEditSubmit}>Sauvegarder</button>
                <button onClick={() => setEditSubmission(null)}>Annuler</button>
              </div>
            ) : (
              <div className="submission-actions">
                <FaCheck className="icon-a icon-accept" onClick={() => approveSubmission(submission)} title="Accepter" />
                <FaTimes className="icon-a icon-reject" onClick={() => rejectSubmission(submission.id)} title="Rejeter" />
                <FaEdit className="icon-a icon-edit" onClick={() => startEditing(submission)} title="Éditer" />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className='no-new'>Pas de nouvelles découvertes, revenez plus tard.</p>
      )}
    </div>
  );
};

export default AdminPage;
