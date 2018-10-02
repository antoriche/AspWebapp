namespace AspWebapp.Models{
    public class Local
    {
            public int id { get; set; }
            public string name { get; set; }
            public int numberSeat { get; set; }

            public override string ToString(){
                return "Local '"+name+"' has "+numberSeat+" seats.";
            }
    }
}