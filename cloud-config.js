/* =========================================================
   cloud-config.js — The Academy's Firebase project.
   These values are public identifiers (not secrets): access to data is
   controlled by the Firestore security rules in firestore.rules.
   To turn the cloud OFF (device-only mode), set enabled: false.
   ========================================================= */
window.CLOUD_CONFIG = {
  enabled: true,
  firebase: {
    apiKey: "AIzaSyDrJTgPSAPbU4qf6uXbPYBKcXI7lknm7O8",
    authDomain: "the-academy---learnhub.firebaseapp.com",
    projectId: "the-academy---learnhub",
    storageBucket: "the-academy---learnhub.firebasestorage.app",
    messagingSenderId: "523434569821",
    appId: "1:523434569821:web:7c4429dd0b881db4a99db4"
  },
  /* Sign-in identities are turned into e-mail addresses for Firebase Auth. Nobody receives mail at them. */
  studentDomain: "students.the-academy.app",
  staffDomain: "staff.the-academy.app",
  /* Minutes of inactivity before a student is signed out on a shared device (0 = never). */
  idleMinutes: 30
};
