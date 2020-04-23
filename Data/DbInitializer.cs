using InsuranceCalc.Models;
using System.Linq;

namespace InsuranceCalc.Data
{
    public static class DbInitializer
    {
        public static void Initialize(InsuranceCalcContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Categories.Any())
            {
                var categories = new Category[]
                {
                    new Category{ID=1,Name="Electronics"},
                    new Category{ID=2,Name="Clothing"},
                    new Category{ID=3,Name="Kitchen"},
                    new Category{ID=4,Name="Furniture"},
                    new Category{ID=5,Name="Jewelery"},
                    new Category{ID=6,Name="Appliances"},
                    new Category{ID=7,Name="Vehicles"},
                    new Category{ID=8,Name="Tools & Equipment"}
                };
                context.Categories.AddRange(categories);
                context.SaveChanges();
            }
            if (!context.Items.Any())
            {
                var items = new Item[]
                {
                    new Item{ID=1,Name="30\" 4K Monitor",Value=2000,CategoryId=1},
                    new Item{ID=2,Name="Gaming Computer",Value=3000,CategoryId=1},
                    new Item{ID=3,Name="7.1 Channel Speaker Set",Value=2230,CategoryId=1},
                    new Item{ID=4,Name="Shirts",Value=1100,CategoryId=2},
                    new Item{ID=5,Name="Jeans",Value=1100,CategoryId=2},
                    new Item{ID=6,Name="Pots & Pans",Value=3000,CategoryId=3},
                    new Item{ID=7,Name="Flatware",Value=500,CategoryId=3},
                    new Item{ID=8,Name="Knife Set",Value=500,CategoryId=3},
                    new Item{ID=9,Name="Misc",Value=1000,CategoryId=3}
                };
                context.Items.AddRange(items);
                context.SaveChanges();
            }
        }
    }
}