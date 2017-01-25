using Microsoft.Web.WebSockets;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.WebSockets;

namespace ApiSimulation.Controllers
{

    /*
   
    JAVASCRIPT CLIENT 
    
     
    var socket = new WebSocket("ws://localhost:61848/WebSocket/Init");
    socket.onmessage = function (evt) { console.log(evt.data); };
    
    socket.send("test message");
         
   */


    public class WebSocketController : Controller
    {

        private static WebSocketCollection clients = new WebSocketCollection();


        public ActionResult Init()
        {
            if (HttpContext.IsWebSocketRequest)
                HttpContext.AcceptWebSocketRequest(new CustomWebSocketHandler());

            return new EmptyResult();
        }

        public async Task<ActionResult> Send(string message)
        {

            using (var ws = new ClientWebSocket())
            {
                Uri serverUri = new Uri("ws://apisimulator.pho.fm/WebSocket/Init"); // bu Url çalışan servisin url'i ile değiştirilecek!

                await ws.ConnectAsync(serverUri, CancellationToken.None);
                var bytesToSend = new ArraySegment<byte>(Encoding.UTF8.GetBytes(message));
                await ws.SendAsync(bytesToSend, WebSocketMessageType.Text, true, CancellationToken.None);         
                await Task.Delay(100);

            }
           return new EmptyResult();
        }

    }


    public class CustomWebSocketHandler : WebSocketHandler
    {
        private static WebSocketCollection clients = new WebSocketCollection();

        public override void OnOpen()
        {
            clients.Add(this);
        }

        public override void OnMessage(string message)
        {
            clients.Broadcast(message);
        }

        public override void OnClose()
        {
            clients.Remove(this);
        }
    }

}
