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
        public InputField(string key, string label, bool required) : this(key, label, required, null, null, null, null) { }
        public InputField(string key, string label, bool required, string placeHolder, AddOn? addOnDirection, string addOnText, string addOnClass) : base(key, "input", label, required)
        {
            TemplateOptions.Type = "text";
            TemplateOptions.Placeholder = placeHolder;

            if (addOnDirection != null)
            {
                var addOn = new TemplateOptionAddOn(addOnText, addOnClass);

                if (addOn != null)
                {
                    if (addOnDirection == AddOn.Left)
                        TemplateOptions.AddonLeft = addOn;
                    else
                        TemplateOptions.AddonRight = addOn;
                }
            }
        }
    }

    public class NumberField : InputField
    {
        public NumberField(string key, string label, bool required) : this(key, label, required, null, null, null, null) { }
        public NumberField(string key, string label, bool required, string placeHolder, AddOn? addOnDirection, string addOnText, string addOnClass) : base(key, label, required)
        {
            TemplateOptions.Type = "number";
            TemplateOptions.Placeholder = placeHolder;
            if (addOnDirection != null)
            {
                var addOn = new TemplateOptionAddOn(addOnText, addOnClass);
                if (addOn != null)
                {
                    if (addOnDirection == AddOn.Left)
                        TemplateOptions.AddonLeft = addOn;
                    else
                        TemplateOptions.AddonRight = addOn;
                }
            }
        }
    }

    public class SelectField : TemplateField
    {
        public SelectField(string key, string label, bool required, List<SelectFieldOption> options) : base(key, "select", label, required)
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

    public static class TemplateFormFactory
    {
        public static TemplateForm Create(object data)
        {
            //TODO:
            return null;
        }
    }

    public static class TemplateFieldFactory
    {
        public static TemplateField Create(FieldType fieldType, object data)
        {
            switch (fieldType)
            {
                case FieldType.Text:
                    return CreateTextField(data);

                case FieldType.Number:
                    return CreateNumberField(data);

                case FieldType.Currency:
                    return CreateTextField(data);

                case FieldType.Select:
                    return CreateTextField(data);

                default:
                    return CreateTextField(data);
            }
        }

        private static TemplateField CreateTextField(object data)
        {
            //TODO
            return new InputField("a", "b", false);
        }

        private static TemplateField CreateNumberField(object data)
        {
            //TODO
            return new NumberField("a", "b", false);
        }

        private static TemplateField CreateCurrencyField(object data, bool custom)
        {
            //TODO
            if (custom)
                return new NumberField("a", "b", false);
            else
                return new NumberField("a", "b", false, "Enter", AddOn.Left, "$", null);
        }

        private static TemplateField CreateSelectField(object data)
        {
            //TODO
            return new SelectField("a", "b", false, null);
        }
    }

    public interface IBiffService
    {
        string GetName();
    }

    public class BiffService : IBiffService
    {
        public string GetName()
        {
            return "Biff Tanner";
        }
    }
}