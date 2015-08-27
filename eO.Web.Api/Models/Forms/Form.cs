using OB.Models.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eO.Web.Api.Models.Forms
{
    #region Form Classes
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

    #endregion

    #region Field Classes

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
        public InputField(string key, string label, bool required) : this(key, label, required, null, null, null, null) { }
        public InputField(string key, string label, bool required, string placeHolder, AddOn? addOnDirection, string addOnText, string addOnClass) : base(key, "input", label, required)
        {
            TemplateOptions.Type = "text";
            TemplateOptions.Placeholder = placeHolder;

            var addOn = new TemplateOptionAddOn(addOnText, addOnClass);

            if (addOnDirection != null)
            {
                if (addOnDirection == AddOn.Left)
                    TemplateOptions.AddonLeft = addOn;
                else
                    TemplateOptions.AddonRight = addOn;
            }
        }
    }

    public class NumericField : InputField
    {
        public NumericField(string key, string label, bool required) : this(key, label, required, null, null, null, null) { }
        public NumericField(string key, string label, bool required, string placeHolder, AddOn? addOnDirection, string addOnText, string addOnClass) : base(key, label, required, placeHolder, addOnDirection, addOnText, addOnClass )
        {
            TemplateOptions.Type = "number";
        }
    }

    public class SelectField : TemplateField
    {
        public SelectField(string key, string label, bool required, List<SelectFieldOption> options) : base(key, "select", label, required)
        {
            TemplateOptions.Options = options;
            TemplateOptions.Placeholder = "Select";
        }
    }

    public class TemplateOptions
    {
        public string Label { get; set; }
        public string Type { get; set; }
        public bool Required { get; set; }
        public string Placeholder { get; set; }
        public TemplateOptionAddOn AddonLeft { get; set; }
        public TemplateOptionAddOn AddonRight { get; set; }
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

    #endregion

    #region Enums
    public enum AddOn
    {
        Left,
        Right
    }

    public enum FieldType
    {
        Text,
        Number,
        Currency,
        Select,
        Email
    }


    #endregion

    #region Factory Classes
    public static class TemplateFormFactory
    {
        public static TemplateForm Create(Form data)
        {
            var form = new SearchForm(data.Id.ToString(), data.Name);

            data.Items.ToList().ForEach(field =>
               {
                   var section = field as Section;
                   if (section != null)
                   {
                       section.Items.ToList().ForEach(item =>
                       {
                           var question = item as Question;
                           if (question != null)
                           {
                               if (question.IsActive)
                               {
                                   var tf = TemplateFieldFactory.Create(question);
                                   form.Fields.Add(tf);
                               }
                           }
                       });
                   }
               });
            return form;
        }
    }

    public static class TemplateFieldFactory
    {
        public static TemplateField Create(FieldType fieldType, object data)
        { return null; }

        public static TemplateField Create(Question question)
        {
            var fieldType = FieldType.Text;

            Enum.TryParse<FieldType>(question.QuestionType.Name, out fieldType);

            switch (fieldType)
            {
                case FieldType.Text:
                    return CreateTextField(question);

                case FieldType.Number:
                    return CreateNumberField(question);

                case FieldType.Currency:
                    return CreateCurrencyField(question, false);

                case FieldType.Select:
                    return CreateSelectField(question);

                default:
                    return CreateTextField(question);
            }
        }

        private static TemplateField CreateTextField(Question question)
        {            
            return new InputField(question.Id.ToString(), question.Name, question.IsRequired);
        }

        private static TemplateField CreateNumberField(Question question)
        {
            return new NumericField(question.Id.ToString(), question.Name, question.IsRequired);
        }

        private static TemplateField CreateCurrencyField(Question question, bool custom)
        {        
            if (custom)
                return new NumericField(question.Id.ToString(), question.Name, question.IsRequired);
            else
                return new NumericField(question.Id.ToString(), question.Name, question.IsRequired, string.Empty, AddOn.Left, "$", null);
        }

        private static TemplateField CreateSelectField(Question question)
        {
            var options = new List<SelectFieldOption>();
            question.Options.ToList().ForEach(item => options.Add(new SelectFieldOption { Name = item.Name, Value = item.Value.ToString() }));
            return new SelectField(question.Id.ToString(), question.Name, question.IsRequired, options);
        }
    }
        
    #endregion    
}