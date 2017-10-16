
      'use strict';
      
      import * as WebSocket from "ws"
      
      // import {Timer} from "./Timer"
      import {Clock} from "./Clock"

      var line = " -------------------------------------------------------------";
      
      class Server{
         
         private port: number;
         private ws: any;
         
         private clock: Clock;
         
         constructor(port:number){
         
            this.port = port;
            this.ws = new WebSocket.Server({ port: this.port });
            
            this.clock = new Clock();
            
            this.initListen();
         }
         
         initListen(){
                  
            this.ws.on('connection', (ws:any,req:any) => {

               let _req : any;
               _req = req;

               const ip = _req.connection.remoteAddress;
               console.log("ip-address ",ip);

               ws.on('message', (payload:any) => {
                  let gmsg;
                  try {
                     let msg = JSON.parse(""+payload);
                     gmsg = msg;
                     // console.log(payload,"message",msg);
                     
                        msg["server"]["now"] = this.clock.now();
                        // fn(msg);
                     let resp = JSON.stringify(msg, null, 3);
                     if(0==1*1){
                        console.log("resp",resp.slice(0,100));
                     }
                     ws.send(resp);
                     
                  } catch (e) {
                     console.error("ERROR",e.message);
                     console.error("msg",gmsg);
                  }
               });
            });
         }
         
      }
      
      
      let port = 3000;

      let ws = new Server(port);
      console.log('WebSocket-Server is running on port', port);
      
      // Access-Control-Allow-Origin: http://localhost:3000
      
      
      
      
      
      
      
      
      
      
      