namespace AspWebapp.Models{
    public class Local
    {
            public int id { get; set; }
            public string name { get; set; }
            public int numberSeat { get; set; }

            public bool validate(){
                if(name == null) return false;
                if(numberSeat<=0)return false;
                return true;
            }

            public override string ToString(){
                return "Local '"+name+"' has "+numberSeat+" seats.";
            }
    }
}