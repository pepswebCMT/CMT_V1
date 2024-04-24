import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { FaCheck, FaTimes, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import './styles/admin.css';
import { useNavigate } from "react-router-dom";

import LangManager from '../components/LangManager';
import CMT from "../assets/img/svg/CMT-logo-text.svg";

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editSubmission, setEditSubmission] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
        navigate('/');
        console.log('Utilisateur déconnecté');
  };

  return (
    <div className='pt-36'>
        <nav className="w-full z-50 bg-orange-400 fixed top-0 flex justify-between items-center gap-2 p-3">
            <div className="w-1/5 flex justify-center items-center">
                <LangManager />
            </div>
            <div className="w-2/4 p-2">
                <img src={CMT} alt="Catch my Tomb" className="w-full" />
            </div>
            <FaSignOutAlt
                className="w-1/5 text-5xl text-white"
                onClick={handleLogout}
                title="Déconnexion"
            />
        </nav>
      {submissions.length > 0 ? (
        submissions.map((submission) => (
          <div key={submission.id} className="submission">
            <h2>{submission.title}</h2>
            {submission.imageUrl && (
              <img src={submission.imageUrl} alt="" className="submission-image" />
            )}
            <p>{submission.cemetery}</p>
            {editSubmission && editSubmission.id === submission.id ? (
              <div className='w-full flex items-center flex-col justify-around'>
                <input className='w-3/4'
                  type="text"
                  value={editSubmission.title}
                  onChange={(e) => handleEditChange(e)}
                />
                <input
                  className='w-3/4'
                  type="text"
                  value={editSubmission.cemetery}
                  onChange={(e) => handleEditChange(e)}
                />
                <div className='w-full flex justify-center items-center'>
                <button className='w-1/3 p-3' onClick={handleEditSubmit}>Sauvegarder</button>
                <button className='w-1/3 p-3' onClick={() => setEditSubmission(null)}>Annuler</button>
                </div>
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
        <p className='pt-40 text-center text-2xl font-bold'>Pas de nouvelles découvertes, revenez plus tard.</p>
      )}
    </div>
  );
};

export default AdminPage;
