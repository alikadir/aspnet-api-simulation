using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ApiSimulation.Startup))]
namespace ApiSimulation
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
