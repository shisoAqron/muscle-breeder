class Myoware {
    constructor() {
      this.keys = ['vcc', 'gnd', 'sig']
      this.requiredKeys = ['vcc', 'gnd', 'sig']
    }
  
    static info() {
      return {
        name: 'Myoware'
      }
    }
  
    wired(obniz) {
        // ピンのアサインは公式リファレンスを参考にした
        const getIO = (io) => {
            if (io && typeof io === 'object') {
                if (typeof io['output'] === 'function') {
                return io
                }
            }
            return obniz.getIO(io)
        }
        const getAD = (ad) => {
            if (ad && typeof ad === 'object') {
                if (typeof ad['output'] === 'function') {
                return ad
                }
            }
            return obniz.getAD(ad)

        }
        this.obniz = obniz
        this.io_vcc = getIO(this.params.vcc)
        this.io_gnd = getIO(this.params.gnd)
        this.ad_sig = getAD(this.params.sig)

        // 5Vの電源
        this.io_vcc.output(true)
        this.io_gnd.output(false)
    }

    // 読み取りの開始とsigピンを返す
    read(){
        this.ad_sig.start()
        //入力が0-Vs(電源の電圧)でかえってくるので.onchangeでトリガーに
        return this.ad_sig
    }
}
  
if (typeof module === 'object') {
    module.exports = Myoware;
}

