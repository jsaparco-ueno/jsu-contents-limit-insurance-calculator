using Microsoft.AspNetCore.Mvc;
using InsuranceCalc.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using InsuranceCalc.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

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
            var categories = _db.Categories.AsNoTracking().ToList();
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
                //This can throw exceptions if it fails.  A try-catch block here is normally necessary to recover from errors but I am omitting it; 
                //I don't anticipate any errors I can recover from in this exercise.
                success = true;
            }
            else
            {
                success = false;
            }
            return success;
        }

        [HttpPost]
        [Route("[controller]/add")]
        public void AddItem(IFormCollection itemData)
        {
            var item = JsonConvert.DeserializeObject<Item>(itemData["metadata"]);
            item.ID = _db.Items.Max(i => i.ID)+1; //Get the next available Item.ID value, assuming an incrementing integer ID.
            //Inserting a new item with ID set to '0' gives a "Cannot insert the value NULL into column 'ID'" error.
            //Normally we would be able to insert with null ID and let the database assign it.
            //The auto-created localDB doesn't seem to have identity specification set on the Item.ID column so it won't assign it for us.
            //We could also set identity specification on the Item.ID column but we would need to create the db from a script, but I won't do that in this exercise.  Using the auto-created localdb simplifies running the project.
            _db.Items.Add(item);
            _db.SaveChanges();
            //This can throw exceptions if it fails.
        }
    }
}