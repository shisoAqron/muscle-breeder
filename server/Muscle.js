const moment = require('moment-timezone')

class Muscle {
    constructor(obniz) {
        this.threshold = 2.5
        this.obniz = obniz
        this.init = false
        this.powerKeep = false
        this.PKStart = null
        this.lastTime = null
        this.powers = []
    }

    resetParams(){
        this.powerKeep = false
        this.PKStart = null
        this.lastTime = null
        this.powers = []
    }

    initialize(){
        this.resetParams()
        this.init = true
    }

    onclose(){
        //力がかかっていた場合にこれまでの値を計算して送る処理
        this.calculatePower()
        this.resetParams()
        this.init = false
    }

    getTS(){
        const now = moment().tz('Asia/Tokyo')
        return now
    }

    setPKStart(date){
        this.PKStart = date
    }

    updateLastTime(date){
        this.lastTime = date
    }

    calculateTotalPower(){
        let total = 0
        this.powers.forEach(d => {
            total += Number(d.power * d.diff)
        })
        this.powers = []
        return Math.floor(total)
    }

    checkPower(voltage){
        let result = {type:'noEvent'}
        if(voltage > this.threshold){
            if(this.init){
                const now = this.getTS()
                const diff = (this.lastTime)
                    ? now.diff(this.lastTime)
                    : 0
                
                // 力の入れ始め
                if(!this.powerKeep) {
                    this.powerKeep = true
                    //console.log('getPower!')
                    this.setPKStart(now)

                    this.obniz.display.clear()
                    this.obniz.display.print("power!!!!")
                }
                this.updateLastTime(now)

                const data = {power: voltage, diff: diff}
                this.powers.push(data)

                result = {
                    type:'getPower',
                    ts:now.format(),
                    power: Math.floor(Number(voltage * diff)),
                    startTime:this.PKStart.format()
                }                
            }
        }else{
            if(!this.init) {
                this.initialize()

                console.log("device is standby")
                this.obniz.display.clear()
                this.obniz.display.print("no power!!!!")
            }
            if(this.powerKeep) {
                const totalPower = this.calculateTotalPower()
                result = {
                    type:'totalPower',
                    ts:this.PKStart.format(),
                    totalPower: totalPower
                }
                this.resetParams()

                this.obniz.display.clear()
                this.obniz.display.print("no power!!!!")
            }
        }
        return result
    }

}

if (typeof module === 'object') {
    module.exports = Muscle;
}