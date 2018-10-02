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
            if(db.FindLocalByName(newLocal.name)){
                // Another local has already this name
                // Should change status code
                return null;
            }
            return db.InsertLocal(newLocal);
        }

        [HttpPut()]
        public Local UpdateLocal([FromBody]Local updatedLocal)
        {
            return db.UpdateLocal(updatedLocal);
        }
    }
}
