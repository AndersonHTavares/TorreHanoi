using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HanoiwebApi.Models;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace HanoiwebApi.api
{
    public class HanoisController : ApiController
    {
        private ContextHanoiTorre db = new ContextHanoiTorre();

        // GET: api/Hanois
        public IQueryable<Hanoi> GetHanoi()
        {
            return db.Hanoi;
        }

        // GET: api/Hanois/5
         [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
         [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> GetHanoi(long id)
        {
             
             var hanoi = db.Hanoi.Where(p => p.id_simulacao == id).OrderBy(d => d.data_inicio_simulacao);
         
            JavaScriptSerializer js = new JavaScriptSerializer();

            return Ok(new { results =js.Serialize(hanoi) });
        }


         // POST: api/Hanois
         [ResponseType(typeof(Hanoi))]
         public async Task<IHttpActionResult> PostHanoi(Hanoi hanoi)
         {

             try
             {              
                 db.Hanoi.Add(hanoi);
                 await db.SaveChangesAsync();

                 return CreatedAtRoute("DefaultApi", new { id = hanoi.id_ }, hanoi);
             }
             catch (Exception e)
             {
                 return Ok(e);//CreatedAtRoute("DefaultApi", new { id = hanoi.id_ }, hanoi);
             }

         }


    }
}