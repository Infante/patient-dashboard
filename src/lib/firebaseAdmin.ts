// Firebase Admin SDK setup
// Server side only
"server-only"

import * as admin from "firebase-admin"

// Define the type for your service account
interface ServiceAccount {
    type: string
    project_id: string
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_x509_cert_url: string
}

// Ensure environment variables are set
const serviceAccount: ServiceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID!,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL!,
    client_id: process.env.FIREBASE_CLIENT_ID!,
    auth_uri: process.env.FIREBASE_AUTH_URI!,
    token_uri: process.env.FIREBASE_TOKEN_URI!,
    auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL!,
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
}

export default admin
