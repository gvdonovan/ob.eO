using eO.Web.Api.Models;
using eO.Web.Api.Models.Forms;
using OB.Services.FormsService;
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
        ITemplateFormService _service;        
        public QuickSearchController(ITemplateFormService service)
        {
            _service = service;            
        }

        [HttpGet]
        [Route("show/{entityId}/{userId}/{formId}")]
        public HttpResponseMessage ShowForm(string entityId, string userId, int formId)
        {
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
        public TemplateForm GetFormData(string entityId, string userId, int formId)
        {
            var form = _service.GetForm(entityId, userId, formId);
            return form;
        }
    }

    public class SearchRequest
    {

        public Dictionary<string, object> FormData { get; set; }
    }

}
