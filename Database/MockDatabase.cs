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
            local.id = locals.Any() ? locals.Max(l=>l.id)+1 : 1;
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

        public Local DeleteLocal(int id){
            Local ret = locals.Where(x => x.id == id).FirstOrDefault();
            if(ret != null)
                this.locals = new List<Local>(locals.Where(x => x.id != id));
            return ret;
        }
    }
}