   
   export class Clock {

      constructor() {  
      }
      
      now(): number{

            let now = process.hrtime()
            
            let seconds = now[0]
            let seconds_to_us = seconds*(1000*1000)
            
            let ns = now[1]
            let us = Math.floor( ns / 1000 )
            
            us += seconds_to_us 
            us = parseInt(us.toString(),10)
            
            return us
            
            // bug - do these transformations take too much time?, evaluate it by running 1000 loops
            // bug - in ~200 years us will be > Number.MAX_SAFE_INTEGER
            // bug - hrtime is not seconds of year !!, just arbitrary point in the past
         
      }   
   }
   
   // https://nodejs.org/api/process.html#process_process_hrtime
   // bug - linux server is not .bat base, so node abort scritp is not working 
   // call node_modules/.bin/gulp on linux if gulp is installed locally and needs npm install merge2
      
      