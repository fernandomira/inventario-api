using InventarioAPI.Data;
using InventarioAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<PdfService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNgrok",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// IMPORTANTE
app.UseCors("AllowNgrok");

app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger

    app.UseSwagger();
    app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();