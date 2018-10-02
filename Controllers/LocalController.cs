using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspWebapp.Models;
using AspWebapp.Database;

namespace AspWebapp.Controllers
{

    [Route("api/[controller]")]
    public class LocalController : Controller
    {
        IDatabase db;

        public LocalController(IDatabase db){
            this.db = db;
        }

        [HttpGet()]
        public IEnumerable<Local> GetAll()
        {
            return db.FetchAllLocals();
        }
        [Route("{id}")]
        [HttpGet]
        public Local GetOne(int id)
        {
            return db.FindLocalById(id);
        }

        [HttpPost()]
        public Local AddNewLocal([FromBody]Local newLocal)
        {
            if(!newLocal.validate() || db.FindLocalByName(newLocal.name) != null){
                // posted local not valid
                // Should change status code and send error message
                return null;
            }
            return db.InsertLocal(newLocal);
        }

        [HttpPut()]
        public Local UpdateLocal([FromBody]Local updatedLocal)
        {
            Local samename = db.FindLocalByName(updatedLocal.name);
            if(!updatedLocal.validate() || (samename != null && samename.id != updatedLocal.id ) ){
                // Should change status code and send error message
                return null;
            }
            return db.UpdateLocal(updatedLocal);
        }

        [Route("{id}")]
        [HttpDelete()]
        public Local DeleteLocal(int id)
        {
            return db.DeleteLocal(id);
        }
    }
}
