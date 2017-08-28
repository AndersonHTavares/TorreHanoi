using HanoiwebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Torre.Controllers
{
    public class LogController : Controller
    {


        public ActionResult Log()
        {
            return View();
        }


        public void InsertSimulador(string inicio, string fim, long SimuladorId, int QtdDiscosinicial)
        {
            try
            {
                HanoiwebApi.api.HanoisController HanoiwebApi = new HanoiwebApi.api.HanoisController();

                Hanoi hanoi = new Hanoi();

                hanoi.id_simulacao = SimuladorId;
                hanoi.qtddiscosInicial = QtdDiscosinicial;
                hanoi.movimento_De = inicio.ToString();
                hanoi.movimento_Para = fim.ToString();
                hanoi.data_inicio_simulacao = DateTime.Now;

                if (String.IsNullOrEmpty(inicio))
                    hanoi.data_fim_simulacao = DateTime.Now;
                else
                    hanoi.data_fim_simulacao = null;

                var response = HanoiwebApi.PostHanoi(hanoi);

            }
            catch (Exception e)
            {
                Console.WriteLine("Log Erro" + e);
            }

        }


    }
}