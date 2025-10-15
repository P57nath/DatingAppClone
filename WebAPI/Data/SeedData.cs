// using DatingApp.Entities;
// using Microsoft.EntityFrameworkCore;

// namespace DatingApp.Data
// {
//     public static class SeedData
//     {
//         public static async Task SeedUsers(DataContext context)
//         {
//             if (await context.Users.AnyAsync()) return;

//             var users = new List<AppUser>
//             {
//                 new AppUser { UserName = "Prious", Gender = "Male", KnownAs = "Prious", City = "Dhaka", Country = "Bangladesh" },
//                 new AppUser { UserName = "Sara", Gender = "Female", KnownAs = "Sara", City = "Chittagong", Country = "Bangladesh" },
//                 new AppUser { UserName = "Alex", Gender = "Male", KnownAs = "Alex", City = "New York", Country = "USA" }
//             };

//             await context.Users.AddRangeAsync(users);
//             await context.SaveChangesAsync();
//         }
//     }
// }
