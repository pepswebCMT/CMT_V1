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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

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
    const batch = db.batch();
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    setSubmissions([]);
  };

  console.log(submissions);
  return (
    <section>
      <div className="w-full flex justify-center font-josefin pt-28">
        <Navbar />
        <div className="w-full max-w-96 p-2 flex flex-col gap-2 justify-center items-center">
          <div className="w-full p-2 rounded-xl shadow-inner sticky z-40 top-28 flex justify-between items-center font-bold text-3xl text-mandarin-100 dark:text-mandarin-600 bg-white dark:bg-dark-400">
            <Link to="/profileAdminCMTPepswebKDJB">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1>{t("admin_title")}</h1>
          </div>
          {submissions.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <button
                className="w-full max-w-96 p-2 bg-red-500 text-white rounded-xl mb-4"
                onClick={clearAllSubmissions}
              >
                {t("admin_clear_all")}
              </button>
              {submissions.map((submission) => (
                <div key={submission.id} className="submission">
                  <h2 className="text-lg font-semibold text-center">
                    {submission.title}
                  </h2>
                  {submission.imageTomb && (
                    <img
                      src={submission.imageTomb}
                      alt=""
                      className="submission-image"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-center">
                    {submission.cemetery}
                  </h3>
                  {editSubmission && editSubmission.id === submission.id ? (
                    <div className="w-full flex flex-col justify-around items-center gap-4 text-xl font-aileron">
                      <input
                        type="text"
                        name="title"
                        value={editSubmission.title}
                        onChange={(e) => handleEditChange(e)}
                        className="w-full max-w-96 border-2 p-2 rounded-xl"
                      />
                      <input
                        type="text"
                        name="cemetery"
                        value={editSubmission.cemetery}
                        onChange={(e) => handleEditChange(e)}
                        className="w-full max-w-96 border-2 p-2 rounded-xl"
                      />
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="w-1/3 p-3"
                          onClick={handleEditSubmit}
                        >
                          {t("admin_save")}
                        </button>
                        <button
                          className="w-1/3 p-3"
                          onClick={() => setEditSubmission(null)}
                        >
                          {t("admin_cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="submission-actions flex justify-between">
                      <div>
                        <FaCheck
                          className="icon-a icon-accept cursor-pointer text-green-500"
                          onClick={() => approveSubmission(submission)}
                          title={t("admin_accept")}
                          size={24}
                        />
                      </div>
                      <div>
                        <FaTimes
                          className="icon-a icon-reject cursor-pointer text-red-500"
                          onClick={() => rejectSubmission(submission.id)}
                          title={t("admin_reject")}
                          size={24}
                        />
                      </div>
                      <div>
                        <FaEdit
                          className="icon-a icon-edit cursor-pointer text-blue-500"
                          onClick={() => startEditing(submission)}
                          title={t("admin_edit")}
                          size={24}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="pt-40 text-center text-2xl font-bold">
              {t("admin_no_tomb")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;