 
   function toInt(val:number){
      return parseInt( val.toString(), 10 )
   }
   
   export class Clock {

      constructor() {  
      }
   
      now(): number{

            // bug - do these transformations take too much time?, evaluate it by running 1000 loops
            
            let hrt = process.hrtime()
            
            let hrt_seconds = hrt[0]
            
            let hrt_ns = hrt[1]
            let hrt_us = hrt_ns / 1000
            
            hrt_us = Math.round( Math.floor( hrt_us ) )
            
            let seconds_to_us = hrt_seconds*(1000*1000)
            
            let us:number
            us = seconds_to_us+hrt_us
            us = toInt(us)
            
            return us
            
            // bug - in ~200 years us will be > Number.MAX_SAFE_INTEGER
            // bug - hrtime is not seconds of year !!, just arbitrary point in the past
            // console.log(hrt_seconds)
         
      }
      
   }
   
   
   // https://nodejs.org/api/process.html#process_process_hrtime
   // bug - linux server is not .bat base, so node abort scritp is not working 
   // call node_modules/.bin/gulp on linux if gulp is installed locally and needs npm install merge2
      
      