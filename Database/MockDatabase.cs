using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using AspWebapp.Models;

namespace AspWebapp.Database{
    public class MockDatabase : IDatabase{
        List<Local> locals = new List<Local>{
            new Local{
                id=1,
                name="A",
                numberSeat=5
            }
        };
        public IEnumerable<Local> FetchAllLocals(){
            return locals;
        }

        public Local FindLocalById(int id){
            return locals.Where(x=>x.id == id).FirstOrDefault();
        }
        public Local FindLocalByName(string name){
            return locals.Where(x=>x.name == name).FirstOrDefault();
        }

        public Local InsertLocal(Local local){
            local.id = locals.Max(l=>l.id)+1;
            locals.Add(local);
            return local;
        }

        public Local UpdateLocal(Local updatedLocal){
            Local old = (from local in locals where local.id == updatedLocal.id select local).FirstOrDefault();
            int index = locals.IndexOf(old);
            if(index != -1)
                locals[index] = updatedLocal;
            else
                return null;
            return updatedLocal;
        }
    }
}