// firebase-admin.ts
import * as admin from "firebase-admin";
import { config as envConfig } from "dotenv";

envConfig();

const data = {
  type: "service_account",
  project_id: "petjoy-31ffe",
  private_key_id: "4e3a9c6d7f248990eed884b91ee22ed2a859b87d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMK4Vhz1/YU2k+\nm54RUtoA41574LaYcYrf1hFev0J6oyE4RygiAhQPRyWcPDxOVdXxRaYWz09fGJXX\nUid/RCEkfQFHozgSOhmADIX9Jv2jNylEccSg1t63heBY6keRRCoeOnf+sT6ASAc6\nN7Af9sffAsr3TtiZ8JgxHNmXfN4SQTL1uKu2GiAIm0EDlTORRUVVH8Q2opnTLZkJ\nvtlwaSjicPS9aYUOcHOK7Fk2S31s6xeI+bNAaffUIFKLdYbE+vf9o2HZUKE9gry1\ntXRcQSKW8qpkuwq+JtOizdqGRMhYirqJ7lhPgciEYC17+cRdDxGq7AmcFTlNaQZe\n3rxtQiB1AgMBAAECggEAAJptKDJ0mk1jhkSeszOPn4qgpRnKLqLpWXH0T+u4bVof\nMV+IPMVGYV8R9/TIV1uKg31mMM4dXfjt8GgHeEQ2Q82zzK/OZjxwjQ78afBGPLps\n1hqrhqIg8PXD7pvz21ZIKwx8OmGFDNwVaPZBeYoSA4cjsJbXT58676xRCwA4+MyD\nsA3ghopf1pV45D9fGt3c1gGLbScbYfzDWMdwnLXUXfjst1PbILgjbr+601G3N/qm\nOk6WjTPZp2zOSP/ji4OrrfBXYZphDCI5AZW6vUypL6yecKJoLEMwhUYnHCyZC08n\nGYE5WGytRxyWFDFoZJF6oHSLaYt0OUfiJMGFsHLv3QKBgQD16naKHvC1OryaoaQJ\n/AWtmVeenyZcll4rzwcyfY8p0EuKoObTL4AbgQnYDCEe3X3VGWONI0G3lPWEDwt/\ndmpdRT3Jahd0dwCid1Eh5uY+BIwpN5787s2rN3Ph0386Wav/sBKfVw6XXY3ihYvG\n5mRDrruyP2mApPx/ZBBuPsWbuwKBgQDUitMkufJune7uJXk4b/6B2VbHfx8fm/Kc\nqjHhnkePBiPO9AWJhFYVdNRijXFCpJ2gFZRRZMjm0K+bvPeJ3s5Y/he5oUr2qCkP\nBEps7odFi+iLoHlF6hOVDbSebtOH2x8uU4zxT63T1zAwL64jNbS0vk+NCE2IOuVj\n9/ouWaK5jwKBgQDBwT4sjTwyTlkTrI/Gnh8LLGpwvAxJnuALvE57ZZpK46bhTu0P\nL7nL8duDserWmsTuBdb9+O1qa58VsZTplK8xVcDc1Q4t4SVK3J+8CmUWMBcO0pgd\nyTma0VIod68ilkyCZIQHr1v7vuZvt7DtwdD10tJoGrZReazH4ltfwW2IyQKBgQCW\nOEhjfMlMRXPJ/dJfgUhwnhwnhEGLJb2j3ObEgAoznDNS4kXHnDD7mUdDIJUcdRyz\nOI1LueAEwxpbCIQsfb16SJycJtPE4bWjV3UC6NPS47/Ib/NG5tpQTw+Jqur26nhv\nVb4YECjbwQveAtUhLaQ62wd+to+V6YqXzXyVpeTNIQKBgBc0l8cVrhOwlNimyAqx\ns9HcFk9Qrn62G0xhwhFWrYznLYrdBF04IX+YTXL43qTQ2thzbzUEsqPu82LbT0y7\nwa08Z/POhyFUDK8Cuy2iQVqXodB7ZsqpUW7Tlz0DC9XbtBgX42il9PZsWZMKJUSe\nTu4mWOHzkTujHD145xtNWwNw\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-6t0gq@petjoy-31ffe.iam.gserviceaccount.com",
  client_id: "105851964964012519753",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6t0gq%40petjoy-31ffe.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(data as admin.ServiceAccount),
});

export const firebaseAdmin = admin;
