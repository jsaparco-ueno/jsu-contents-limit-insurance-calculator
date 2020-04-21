using Microsoft.AspNetCore.Mvc;
using InsuranceCalc.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using InsuranceCalc.Models;

namespace InsuranceCalc.Controllers
{
    [ApiController]
    public class InsuranceCalcController : ControllerBase
    {
        private InsuranceCalcContext _db;
        public InsuranceCalcController(InsuranceCalcContext context)
        {
            _db = context;
        }

        [HttpGet]
        [Route("[controller]")]
        public IEnumerable<Category> Get()
        {
            var items = _db.Items.AsNoTracking().ToList();
            var categoryIds = items.Select(i => i.CategoryId).Distinct();
            var categories = _db.Categories.AsNoTracking().Where(c => categoryIds.Contains(c.ID)).ToList();
            categories.ForEach(c => c.Items = items.Where(i => i.CategoryId == c.ID).ToList());
            return categories;
        }

        [HttpDelete]
        [Route("[controller]/delete/{id}")]
        public bool DeleteItem(int id)
        {
            var success = false;
            var item = _db.Items.FirstOrDefault(i => i.ID == id);
            if (!(item == default(Item)))
            {
                _db.Remove(item);
                _db.SaveChanges();
                success = true;
            }
            else
            {
                success = false;
            }
            return success;
        }
    }
}