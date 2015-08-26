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
        private IBiffService _biffService;

        public QuickSearchController()
        {
            //_biffService = biffService;
        }

        [HttpGet]
        [Route("show/{entityId}/{userId}/{formId}")]
        public HttpResponseMessage ShowForm(string entityId, string userId, int formId)
        {
            //Console.WriteLine(_biffService.GetName());

            //TODO:  validate incoming parameters
            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = string.Format(WebConfigurationManager.AppSettings["QuickSearchUrl"], "true", "init", entityId, userId, formId);
            response.Headers.Location = new Uri(url);
            return response;
        }

        [HttpGet]
        [Route("results/{entityId}/{userId}/{formId}")]
        public HttpResponseMessage ShowResults(string entityId, string userId, int formId)
        {
            var response = Request.CreateResponse(HttpStatusCode.Redirect);
            var url = string.Format(WebConfigurationManager.AppSettings["QuickSearchUrl"], "true", "results", entityId, userId, formId);
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
            searchForm.Fields.Add(new SelectField("occupancy", "Occupancy", false, new List<SelectFieldOption> { new SelectFieldOption { Name = "Owner Occupied", Value = "Owner Occupied" }, new SelectFieldOption { Name = "Other", Value = "Other" } }));
            searchForm.Fields.Add(new SelectField("propertyType", "Property Type", false, new List<SelectFieldOption> { new SelectFieldOption { Name = "Single Family", Value = "Single Family" }, new SelectFieldOption { Name = "PUD", Value = "PUD" },
                                        new SelectFieldOption { Name = "Multi-Family", Value = "Multi-Family" }, new SelectFieldOption { Name = "Manufactured / Single Wide", Value = "Manufactured / Single Wide" },
                                        new SelectFieldOption { Name = "Manufactured / Double Wide", Value = "Manufactured / Double Wide" }, new SelectFieldOption { Name = "Timeshare", Value = "Timeshare" },
                                        new SelectFieldOption { Name = "Condotel", Value = "Condotel" }, new SelectFieldOption { Name = "Non-warrantable Condo", Value = "Non-warrantable Condo" }, new SelectFieldOption { Name = "Modular", Value = "Modular" }}));
            searchForm.Fields.Add(new InputField("loanPurpose", "Loan Purpose", false, "Loan Purpose", null, null, null));
            searchForm.Fields.Add(new NumberField("purchasePrice", "Purchase Price", false, "Purchase Price", AddOn.Left, "$", null));
            searchForm.Fields.Add(new NumberField("downPayment", "Down Payment", false, "Down Payment", AddOn.Left, "$", null));
            searchForm.Fields.Add(new InputField("zip", "Zip", false, "Zip", null, null, null));
            searchForm.Fields.Add(new InputField("creditScore", "Credit Score", false, "Credit Score", null, null, null));

            return searchForm;
        }
    }

    public class SearchRequest
    {

        public Dictionary<string, object> FormData { get; set; }
    }

}
