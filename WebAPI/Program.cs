using DatingApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader().
AllowAnyMethod().
WithOrigins("http://localhost:4200","https://localhost:4200"));
//app.UseHttpsRedirection();
app.MapControllers();
app.Run();
