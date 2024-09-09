// firebase-admin.ts
import * as admin from "firebase-admin";
import serviceAccount from "./petjoy-31ffe-firebase-adminsdk-6t0gq-4e3a9c6d7f.json"; // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firebaseAdmin = admin;
