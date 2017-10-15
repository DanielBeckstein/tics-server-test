
      'use strict';
      
      import * as WebSocket from "ws"

   var g_cnt = 0;
   var line = " -------------------------------------------------------------";
   
   var g: { [key: string]: any; } = { };
   
   // https://nodejs.org/api/process.html#process_process_hrtime
   // bug - linux server is not .bat base, so node abort scritp is not working 
   // call node_modules/.bin/gulp on linux if gulp is installed locally and needs npm install merge2

   function toInt(val:number){
      return parseInt( val.toString(), 10 )
   }

   function is_server(){
      return (typeof window === 'undefined')
   }
   
   class Clock {

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
   
    class Timer {
            
            private time_last: number
            private clock: Clock
            
            private verbosity: number = 0
            
            constructor(){
               this.clock = new Clock()
               this.time_last = this.now()
            }
            
            
            private now(){
               return this.clock.now();
            }
            
            stop(){
               let time_now = this.now()
               let delt = time_now - this.time_last
               this.time_last = time_now
               return delt
            }
            
            get(){
               let time_now = this.now()
               let delt = time_now - this.time_last
               return delt
            }
            
         }   
   
   
      
   g.clock = new Clock()
   g.timer = new Timer()
      
      let port = 3000
      var server = new WebSocket.Server({ port: port });
     
      function sum(a:any[]){
         let sum = 0
         console.log("sum", a);
         for ( let el of a ){
            // sum += el*el;
            sum += el;
         }
         return sum
      }
     
     
      server.on('connection', (ws,req) => {
         let _ws : any;
         let _req : any;
         _req = req;
         _ws = ws;
         console.log(_ws._socket._bytesDispatched);
         // console.log(_req);
         const ip = _req.connection.remoteAddress;
         console.log("ip-address ",ip);
         // console.log(JSON.stringify(ws));
         
         // let id = cons_counter++;
         // cons[id] = ws
         
         ws.on('message', payload => {
            let gmsg;
            try {
               let msg = JSON.parse(""+payload);
               gmsg = msg;
               // console.log(payload);
               // console.log("message",msg);
               
               if(0==1*1){
                  console.log(JSON.stringify(msg,null,3));
                  msg.result = sum(msg.body);
               }
             
                  // msg["now"] = g.clock.now();
                  msg["server"]["now"] = g.clock.now();
             
                  // msg["server"]["now"] = g.clock.now();
                  // fn(msg);
             
               let resp = JSON.stringify(msg, null, 3);
               if(0==1*1){
                  console.log("resp",resp.slice(0,100));
               }
               // // broadcast(resp);
               ws.send(resp);
               
                // console.log("-------------------");
               
            } catch (e) {
               console.error("ERROR",e.message);
               console.error("msg",gmsg);
            }
         });
      });
      
      console.log('Server is running on port', port);
      
      // tsc --module commonjs --target ES6  --outDir ws\ ws\test.ts
      // "node_modules/.bin/webpack" --watch
           
      // npm install ws -save
      // npm install --save @types/ws
      // npm install --save-dev @types/node

      // Access-Control-Allow-Origin: http://localhost:3000
      
      
      
      
      
      
      
      
      
      
      