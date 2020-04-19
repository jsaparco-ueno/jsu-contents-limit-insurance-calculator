using Microsoft.AspNetCore.Mvc;
using InsuranceCalc.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using InsuranceCalc.Models;

namespace InsuranceCalc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InsuranceCalcController : ControllerBase
    {
        private InsuranceCalcContext _db;
        public InsuranceCalcController(InsuranceCalcContext context)
        {
            _db = context;
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            var items = _db.Items.AsNoTracking().ToList();
            var categoryIds = items.Select(i => i.CategoryId).Distinct();
            var categories = _db.Categories.AsNoTracking().Where(c => categoryIds.Contains(c.ID)).ToList();
            categories.ForEach(c => c.Items = items.Where(i => i.CategoryId == c.ID).ToList());
            return categories;
        }
    }
}