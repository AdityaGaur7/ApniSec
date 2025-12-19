const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=');
            process.env[key.trim()] = value.trim();
        }
    });
}

async function check() {
    console.log('Checking Environment Variables...');

    const uri = process.env.MONGODB_URI;
    if (!uri) console.error('❌ MONGODB_URI is missing');
    else console.log('✅ MONGODB_URI is set');

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) console.error('❌ JWT_SECRET is missing');
    else console.log('✅ JWT_SECRET is set');

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) console.error('❌ RESEND_API_KEY is missing');
    else console.log('✅ RESEND_API_KEY is set');

    if (uri) {
        console.log('Testing DB Connection...');
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log('✅ Connected to MongoDB successfully!');
            await mongoose.disconnect();
        } catch (e) {
            console.error('❌ Connection failed:', e.message);
        }
    }
}
check();
