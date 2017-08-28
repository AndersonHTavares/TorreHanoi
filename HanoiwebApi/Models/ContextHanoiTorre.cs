using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HanoiwebApi.Models
{
    public class ContextHanoiTorre : DbContext
    {
        public DbSet<Hanoi> Hanoi { get; set; }
    }
}