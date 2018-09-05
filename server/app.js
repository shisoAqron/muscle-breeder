const fs = require("fs")
const path = require("path")
const Obniz = require("obniz")
const admin = require('firebase-admin')
const Myoware = require(path.join(__dirname,'/Myoware'))
Obniz.PartsRegistrate(Myoware)
const Muscle = require(path.join(__dirname,'Muscle'))

const serviceAccount = require('./muscle-breeder-firebase-adminsdk.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://muscle-breeder.firebaseio.com"
})
const db = admin.database()
const status = db.ref("status")
const logs = db.ref("logs")

const tokenObj = JSON.parse(fs.readFileSync(path.join(__dirname,'/token.json'), 'utf8'))
const obniz = new Obniz(tokenObj.id)
const muscle = new Muscle(obniz)

// 電源を再投入してもそのままつながる
obniz.onconnect = async () => {
    console.log("obniz connected and initializing...")
    obniz.display.clear()
    obniz.display.print("obniz connected and initializing...")
    
    const myo = obniz.wired('Myoware', {vcc:0, gnd:1, sig:2})
    await obniz.wait(3000)

    const signal = myo.read()
    signal.onchange = (voltage) => {
        //console.log(voltage)
        const data = muscle.checkPower(voltage)
        switch (data.type) {
            case 'noEvent':
                break;

            case 'totalPower':
                if(data.totalPower > 0){
                    logs.push({
                        timestamp: data.ts,
                        power: data.totalPower
                    })
                }
                status.set({
                    mode: 'standby'
                })
                console.log(data)
                break;
            
            case 'getPower':
                status.set({
                    mode: data.type,
                    timestamp: data.ts,
                    power: data.power,
                    startTime: data.startTime
                })
                break;
        
            default:
                console.log(data)
                break;
        }
    }

}

obniz.onclose = async () => {
    muscle.onclose()
}