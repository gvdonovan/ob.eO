using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eO.Web.Api.Models.Forms
{
    public class TemplateForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Header { get; set; }
        public List<TemplateField> Fields { get; set; }

        public TemplateForm(string id, string name)
        {
            Fields = new List<TemplateField>();
        }        
    }

    public class SearchForm : TemplateForm
    {
        public List<ResultColumn> Columns { get; set; }

        public SearchForm(string id, string name) : base(id, name)
        {
            Columns = new List<ResultColumn>();

        }        
    }

    public class ResultColumn
    {
        public string Header { get; set; }
        public string HelpText { get; set; }        
    }

    public class TemplateField
    {
        public string Key { get; set; }
        public string Type { get; set; }
        public string HelpText { get; set; }
        public TemplateOptions TemplateOptions { get; set; }

        public TemplateField(string key, string type, string label, bool required)
        {
            Key = key;
            Type = type;
            TemplateOptions = new TemplateOptions { Label = label, Required = required };
        }
    }

    public class InputField : TemplateField
    {
        public InputField(string key, string label, bool required) : base (key, "input", label, required) { }
        public InputField(string key, string label, bool required, string placeHolder, AddOn addOnDirection, string addOnText, string addOnClass) : this(key, label, required)
        {
            TemplateOptions.Placeholder = placeHolder;

            var addOn = new TemplateOptionAddOn(addOnText, addOnClass);

            if (addOnDirection == AddOn.Left)
                TemplateOptions.AddOnLeft = addOn;            
            else 
                TemplateOptions.AddOnRight = addOn;
        }
    }

    public class SelectField : TemplateField
    {
        public SelectField(string key, string label, bool required, List<SelectFieldOption> options) : base (key, "select", label, required)
        {
            TemplateOptions.Options = options;
        }
    }
    
    public class TemplateOptions
    {
        public string Label { get; set; }
        public string Type { get; set; }
        public bool Required { get; set; }
        public string Placeholder { get; set; }
        public TemplateOptionAddOn AddOnLeft { get; set; }
        public TemplateOptionAddOn AddOnRight { get; set; }
        public List<SelectFieldOption> Options { get; set; }
    }

    public class SelectFieldOption
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class TemplateOptionAddOn
    {
        public string Text { get; set; }
        public string Class { get; set; }

        public TemplateOptionAddOn(string text, string cssClass)
        {
            Text = text;
            Class = cssClass;
        } 
    }    

    public enum AddOn
    {
        Left,
        Right
    }
}