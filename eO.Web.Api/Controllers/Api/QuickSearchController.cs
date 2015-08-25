using eO.Web.Api.Models;
using eO.Web.Api.Models.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;

namespace eO.Web.Api.Controllers.Api
{
    [RoutePrefix("api/search")]
    public class QuickSearchController : ApiController
    {
        [HttpGet]
        [Route("show/{entityId}/{userId}/{formId}")]
        public HttpResponseMessage ShowForm(string entityId, string userId, int formId)
        {
            //TODO:  validate incoming parameters

            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = WebConfigurationManager.AppSettings["QuickSearchUrl"];
            response.Headers.Location = new Uri(url);
            return response;
        }

        [HttpGet]
        [Route("results")]
        public HttpResponseMessage ShowResults()
        {
            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = WebConfigurationManager.AppSettings["QuickSearchResultsUrl"];
            response.Headers.Location = new Uri(url);
            return response;
        }

        [HttpGet]
        [Route("results1")]
        public HttpResponseMessage ShowResults1([FromUri] SearchRequest request)
        {
            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = WebConfigurationManager.AppSettings["QuickSearchResultsUrl"];
            response.Headers.Location = new Uri(url);
            return response;
        }

        [HttpPost]
        [Route("results2")]
        public HttpResponseMessage ShowResults2(SearchRequest request)
        {        
            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = WebConfigurationManager.AppSettings["QuickSearchResultsUrl"];
            response.Headers.Location = new Uri(url);
            return response;
        }

        [HttpGet]
        [Route("GetFormData/{entityId}/{userId}/{formId}")]
        public SearchForm GetFormData(string entityId, string userId, int formId)
        {
            var searchForm = new SearchForm("1", "Biff Form");
            searchForm.Fields.Add(new SelectField("occupancy", "Occupancy", false, new List<SelectFieldOption> { new SelectFieldOption { Name = "Owner Occupied", Value = "Owner Occupied" }, new SelectFieldOption { Name = "Other", Value = "Other" }}));
            searchForm.Fields.Add(new InputField("loanamount", "Loan Amount", false, "Loan Amount", AddOn.Left, "$", null));
            return searchForm;
        }
    }

    public class SearchRequest
    {

        public Dictionary<string, object> FormData { get; set; }
    }

}
