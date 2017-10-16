
      'use strict';

      import * as WebSocket from "ws"
      
      import {Clock} from "./Clock"
      
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
             this.ws.on('connection', (ws: any, req: any) => {

                  this.logIpAdress(req);

                  ws.on('message', (payload: any) => {

                     try {                     
                         let resp = this.makeResponse(payload);
                         ws.send(resp);
                         
                     } catch (e) {
                         console.error("ERROR", e.message);
                         console.error("payload", payload);
                     }
                  });
            });
         }
         
         makeResponse(payload:any){
            
            let msg = JSON.parse("" + payload);
            // console.log(payload,"message",msg);
            
            msg["server"]["now"] = this.clock.now();
            // fn(msg);

            let resp = JSON.stringify(msg);
            // let resp = JSON.stringify(msg, null, 3);
            // console.log(resp);

            return resp;
         }
         
         logIpAdress(req:any){
            const ip = req.connection.remoteAddress;
            console.log("ip-address ", ip);
         }
         
      }
      
      let port = 3000;

      let ws = new Server(port);
      console.log('WebSocket-Server is running on port', port);
      
      // Access-Control-Allow-Origin: http://localhost:3000
      
      
      
      
      
      
      
      
      
      
      