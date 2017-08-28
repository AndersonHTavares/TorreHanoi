using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HanoiwebApi.Models
{
    public class Hanoi
    {

        [Key]
        public int id_ { get; set; }
        public long id_simulacao { get; set; }
        public int qtddiscosInicial { get; set; }
        public string movimento_De { get; set; }
        public string movimento_Para { get; set; }
        public DateTime data_inicio_simulacao { get; set; }

        public DateTime? data_fim_simulacao { get; set; }
    }
}