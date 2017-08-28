using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Threading;
using System.Net.Http;
using Torre.Models;
using HanoiwebApi.Models;
using System.Web.Script.Serialization;

namespace Torre.Controllers
{
    public class HomeController : Controller
    {

        LogController Log = new LogController();

        DateTime date = DateTime.Now;
        int[] QtdDiscoHanoi = new int[3];
        long[] SimuladorId = new long[3];

		public ActionResult Index()
        {
			return View();
        }


        public ActionResult LogHanoi()
        {
            return View();
        }

        public void GerarSimuladorId()
        {     
            Random rdn = new Random();    

            for (int i = 0; i < 3; i++)
                SimuladorId[i] = i+ long.Parse(date.ToString("yyyyMMddHHmmss")) + rdn.Next(1, 100);      
        }

        public string Simular(int qtddiscohanoi1, int qtddiscohanoi2, int qtddiscohanoi3)
        {
            QtdDiscoHanoi[0] = qtddiscohanoi1;
            QtdDiscoHanoi[1] = qtddiscohanoi2;
            QtdDiscoHanoi[2] = qtddiscohanoi3;

            GerarSimuladorId();

            ConstroiTorres();

            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(SimuladorId);

        }


        public void ConstroiTorres() {

			Random rnd = new Random();
		
			//Console.WriteLine("======MultiThreads======");
			Thread[] Threads = new Thread[3];
           
            for (int i = 0; i < Threads.Count(); i++)
			{           
				Threads[i] = new Thread(new ThreadStart(IniciarSimulador));
                Threads[i].Name = i.ToString();    
			}

			foreach (Thread t in Threads)
				t.Start();
        }


        public void IniciarSimulador()
		{
            int Simulador = Convert.ToInt32(Thread.CurrentThread.Name);

            int Qtddiscos = 0;
            if (Simulador == 0) Qtddiscos = QtdDiscoHanoi[0];
            if (Simulador == 1) Qtddiscos = QtdDiscoHanoi[1];
            if (Simulador == 2) Qtddiscos = QtdDiscoHanoi[2];

            MoveTorre(Qtddiscos, "A", "B", "C", SimuladorId[Simulador], Qtddiscos);

            Log.InsertSimulador("", "", SimuladorId[Simulador], Qtddiscos);

            Thread.Sleep(1000);
		}


        public void MoveTorre(int QtsDiscos, string torreA, string torreB, string torreC, long SimuladorId, int QtdDiscosinicial)
        {
			if (QtsDiscos == 0) return;
			
            try
            {
                // Finaliza na B
                MoveTorre(QtsDiscos - 1, torreA, torreC, torreB, SimuladorId, QtdDiscosinicial);
                Log.InsertSimulador(torreA, torreB, SimuladorId, QtdDiscosinicial);
                MoveTorre(QtsDiscos - 1, torreC, torreB, torreA, SimuladorId, QtdDiscosinicial);

                //Finaliza na C
                //MoveTorre(QtsDiscos - 1, torreA, torreB, torreC, SimuladorId);
                //Log_moveUmDisco(torreA, torreB, SimuladorId);
                //MoveTorre(QtsDiscos - 1, torreC, torreA, torreB, SimuladorId);
            }
            catch (Exception e)
            {
                Console.WriteLine("Log Erro" + e);
            }
		}

  

        //public void InsertSimulador(string inicio, string fim, long SimuladorId, int QtdDiscosinicial)
        //{
        //    try
        //    {
        //        HanoiwebApi.api.HanoisController HanoiwebApi = new HanoiwebApi.api.HanoisController();

        //        Hanoi hanoi = new Hanoi();
   
        //        hanoi.id_simulacao = SimuladorId;
        //        hanoi.qtddiscosInicial = QtdDiscosinicial;
        //        hanoi.movimento_De = inicio.ToString();
        //        hanoi.movimento_Para = fim.ToString();
        //        hanoi.data_inicio_simulacao = DateTime.Now;

        //        if (String.IsNullOrEmpty(inicio))
        //            hanoi.data_fim_simulacao = DateTime.Now;
        //        else
        //            hanoi.data_fim_simulacao = null;
                         
        //        var response = HanoiwebApi.PostHanoi2(hanoi);

        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine("Log Erro" + e);
        //    }

        //}


	}
}
