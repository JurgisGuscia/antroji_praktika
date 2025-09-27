using Microsoft.EntityFrameworkCore;
using back_end.Data;
public class Startup
{
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration) => Configuration = configuration;
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddDbContext<MyDbContext>(options =>
            options.UseMySql(
                Configuration.GetConnectionString("Database"),
                ServerVersion.AutoDetect(Configuration.GetConnectionString("Database"))
            ));
        services.AddDistributedMemoryCache(); 
        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
            options.Cookie.SameSite = SameSiteMode.None; 
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always; 
        });
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", builder =>
            {
                builder.WithOrigins("https://praktika.jurgisguscia.lt") 
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials(); 
            });
        });
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseSession(); 
        app.UseCors("AllowFrontend");
        app.UseAuthorization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}
