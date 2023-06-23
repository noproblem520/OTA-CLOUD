require('dotenv').config();
const fs = require('fs').promises;
const ellipticcurve = require("@starkbank/ecdsa");
const path = require('path');

const metadata = {
    "file_hashes": {
        "docker-compose.yml": "41c904680811d4e18b76da3fb1c20ef6d0251700587647e3b4208508fdd12e69",
        "rear_brake.tar": "9c7a54a9a43cca047013b82af109fe963fde787f63f9e016fdc3384500c2823d",
        "run.sh": "853f1f9615a4a09ec2f5b459b5ba4efb792dab32e5780c7e9eed64cdc108647e"
    },
    "safe_vehicle_state": "Parked",
    "conditions": {
        "temperature_range": "0-35",
        "battery_level": ">80%"
    },
    "compatibility_information": {
        "vehicle_models": ["Model 1", "Model 2"],
        "vehicle_systems": ["System 1", "System 2"],
        "ecus": ["ECU 1", "ECU 2"]
    },
    "version_information": {
        "version_number": "1.0.0",
        "release_date": "2023-06-01"
    },
    "necessary_resources": {
        "memory": "2GB",
        "processor_speed": "1.6GHz"
    }
}


const ECDSA = ellipticcurve.Ecdsa
// const privateKey = ellipticcurve.PrivateKey.fromString(process.env.PRIVATE_KEY);
// const msg = JSON.stringify(metadata);

// console.log(privateKey.publicKey().toPem())
// let signature = ECDSA.sign(msg, privateKey)

// console.log(signature.toBase64())


async function readJsonFile() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'public', 'updatepackages', 'metadata.json'), 'utf8');
        const obj = JSON.parse(data);
        return obj;
    } catch (err) {
        console.error('An error occurred:', err);
        return;
    }
}



readJsonFile().then((result) => {
    // console.log(JSON.stringify(result.metadata));
    // console.log(JSON.stringify(result.signature) === );
    console.log(ECDSA.verify(JSON.stringify(result.metadata), ellipticcurve.Signature.fromBase64(JSON.stringify(result.signature)), ellipticcurve.PublicKey.fromPem(`-----BEGIN PUBLIC KEY-----
    MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEHYxqqUj+xDevCMJSGNlNclk2qgi0az2k
    Ok4RsyMJBhpZw39NT2L6S6HjNMMudL/eBworzk7uSq6oynKEV5sn0A==
    -----END PUBLIC KEY-----`)))
}).catch((e) => {
    console.log(e);
})

