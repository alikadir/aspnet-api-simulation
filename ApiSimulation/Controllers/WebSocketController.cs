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
using System.Net;

namespace ApiSimulation.Controllers
{



    public class WebSocketController : Controller
    {

        public ActionResult Init()
        {
            if (HttpContext.IsWebSocketRequest)
                HttpContext.AcceptWebSocketRequest(new CustomWebSocketHandler());

            return new EmptyResult();
        }

        public async Task<ActionResult> Send(string message)
        {

            if (message.Length > 5 && message.IndexOf("http", 0, 5) != -1) // bir url den istekde bulunup sonucunu mesaj olarak ilet.
            {
                using (var wc = new WebClient())
                {
                    try
                    {
                        message = wc.DownloadString(message);
                    }
                    catch { }
                }
            }
            
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

        public ActionResult GetClientList()
        {
            return Json(CustomWebSocketHandler.clients.Select(x => new { IP = x.WebSocketContext.UserHostAddress, UserAgent = x.WebSocketContext.UserAgent }), JsonRequestBehavior.AllowGet);
        }

    }


    public class CustomWebSocketHandler : WebSocketHandler
    {
        public static WebSocketCollection clients = new WebSocketCollection();

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
