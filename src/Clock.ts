 
   function toInt(val:number){
      return parseInt( val.toString(), 10 )
   }

   function is_server(){
      return (typeof window === 'undefined')
   }
   
   export class Clock {

      constructor() {
         
      }
      
      now(): number{
         return this.get_us()
      }
      
      get_us(): number{
         if ( is_server() ){
            // bug - do these transformations take too much time?, evaluate it by running 1000 loops
            let hrt = process.hrtime()
            let hrt_seconds = hrt[0]
            let hrt_ns = hrt[1]
            let hrt_us = hrt_ns / 1000
            hrt_us = Math.round( Math.floor( hrt_us ) )
            let us:number
            us = hrt_seconds*(1000*1000)+hrt_us
            // bug - in ~200 years us will be > Number.MAX_SAFE_INTEGER
            // bug - hrtime is not seconds of year !!, just arbitrary point in the past
            us = toInt(us)
            // console.log(hrt_seconds)
            return us
         }else{            
            let ns = performance.now()
            let us = ns * 1000
            us = toInt(us)
            return us
         }
      }
      
   }
   
   
   // https://nodejs.org/api/process.html#process_process_hrtime
   // bug - linux server is not .bat base, so node abort scritp is not working 
   // call node_modules/.bin/gulp on linux if gulp is installed locally and needs npm install merge2
      
      