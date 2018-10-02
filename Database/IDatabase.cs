using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using AspWebapp.Models;

namespace AspWebapp.Database{
    public interface IDatabase{
        IEnumerable<Local> FetchAllLocals();
        Local FindLocalById(int id);
        Local FindLocalByName(string name);
        Local InsertLocal(Local local);
        Local UpdateLocal(Local updatedLocal);
        Local DeleteLocal(int id);
    }
}