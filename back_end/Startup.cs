using Microsoft.EntityFrameworkCore;
using back_end.Data;
public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // Register services (DI container)
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddDbContext<MyDbContext>(options =>
            options.UseMySql(
                Configuration.GetConnectionString("Database"),
                ServerVersion.AutoDetect(Configuration.GetConnectionString("Database"))
            ));
        
        services.AddDistributedMemoryCache(); // for session storage in memory

        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });
    }
 
    // Configure middleware & routing
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseSession(); 
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
            endpoints.MapControllers());// enable controllers
    }
}
