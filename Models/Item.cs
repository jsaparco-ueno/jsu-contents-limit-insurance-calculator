using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsuranceCalc.Models
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public int CategoryId { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}