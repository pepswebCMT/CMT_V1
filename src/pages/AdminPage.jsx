import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editSubmission, setEditSubmission] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, "PendingTombs"));
      const sortedSubmissions = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.submissionDate?.seconds - b.submissionDate?.seconds);
      setSubmissions(sortedSubmissions);
    };

    fetchSubmissions();
  }, []);

  const approveSubmission = async (submission) => {
    await addDoc(collection(db, "NewTombs"), submission);
    await deleteDoc(doc(db, "PendingTombs", submission.id));
    setSubmissions(submissions.filter((s) => s.id !== submission.id));
  };

  const rejectSubmission = async (id) => {
    await deleteDoc(doc(db, "PendingTombs", id));
    setSubmissions(submissions.filter((s) => s.id !== id));
  };

  const startEditing = (submission) => {
    setEditSubmission({ ...submission });
  };

  const handleEditChange = (e) => {
    setEditSubmission({ ...editSubmission, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await setDoc(doc(db, "PendingTombs", editSubmission.id), editSubmission);
    setSubmissions(
      submissions.map((s) => (s.id === editSubmission.id ? editSubmission : s))
    );
    setEditSubmission(null);
  };

  const clearAllSubmissions = async () => {
    const querySnapshot = await getDocs(collection(db, "PendingTombs"));
    querySnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setSubmissions([]);
  };

  return (
    <>
      <Navbar />
      <div className="admin">
        <div className="admin__header">
          <Link to="/profile" className="admin__back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="admin__title">{t("admin_title")}</h1>
        </div>
        <button
          className="admin__button admin__button--clear"
          onClick={clearAllSubmissions}
        >
          {t("admin_clear_all")}
        </button>
        {submissions.length > 0 ? (
          <div className="admin__submissions">
            {submissions.map((submission) => (
              <div key={submission.id} className="admin__submission">
                <div className="admin__submission-container">
                  <h2 className="admin__submission-title">
                    {submission.title}
                  </h2>
                  <button
                    className="admin__button admin__button--edit"
                    onClick={() => startEditing(submission)}
                  >
                    Modifier
                  </button>
                </div>
                {submission.imageTomb && (
                  <img
                    src={submission.imageTomb}
                    alt="Submission"
                    className="admin__submission-image"
                  />
                )}
                <p className="admin__submission-details">
                  {submission.cemetery}
                </p>
                {editSubmission && editSubmission.id === submission.id ? (
                  <form className="admin__edit-form">
                    <input
                      type="text"
                      name="title"
                      value={editSubmission.title}
                      onChange={handleEditChange}
                      className="admin__input"
                    />
                    <input
                      type="text"
                      name="cemetery"
                      value={editSubmission.cemetery}
                      onChange={handleEditChange}
                      className="admin__input"
                    />
                    <div className="admin__actions">
                      <button
                        type="button"
                        className="admin__button admin__button--save"
                        onClick={handleEditSubmit}
                      >
                        {t("admin_save")}
                      </button>
                      <button
                        type="button"
                        className="admin__button admin__button--cancel"
                        onClick={() => setEditSubmission(null)}
                      >
                        {t("admin_cancel")}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="admin__submission-actions">
                    <button
                      className="admin__button admin__button--accept"
                      onClick={() => approveSubmission(submission)}
                    >
                      Valider
                    </button>
                    <button
                      className="admin__button admin__button--reject"
                      onClick={() => rejectSubmission(submission.id)}
                    >
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="admin__empty">{t("admin_no_tomb")}</p>
        )}
      </div>
    </>
  );
};

export default AdminPage;
