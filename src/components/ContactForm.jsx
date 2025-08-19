import { useState } from "react";
import TextAnimH1 from "./TextAnimH1";
import TextAnimP1 from "./TextAnimP1";

// Reusable Form Field Component
const FormField = ({ field, value, onChange, isLanding = false, delay = 0 }) => {
  const { id, label, name, type, placeholder, required, isTextarea } = field;
  
  const commonClasses = "w-full bg-transparent border-0 pointer-events-auto border-b pb-8 border-zinc-600 py-2 text-2xl placeholder-zinc-600 font-semibold focus:outline-none focus:border-gray-400 transition-colors";
  
  return (
    <TextAnimP1 isLanding={isLanding} delay={delay}>
      <div>
        <label className="block text-sm text-zinc-200 mb-1">
          {id} {label}
        </label>
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border-0 pointer-events-auto py-2 text-2xl placeholder-zinc-600 font-semibold focus:outline-none focus:border-gray-400 transition-colors resize-none"
            rows="3"
            required={required}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={commonClasses}
            required={required}
          />
        )}
      </div>
    </TextAnimP1>
  );
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  // Form fields configuration
  const formFields = [
    {
      id: "01",
      label: "What's your name?",
      name: "name",
      type: "text",
      placeholder: "John Doe*",
      required: true,
      isLanding: true,
      delay: 0.2
    },
    {
      id: "02",
      label: "What's your email?",
      name: "email",
      type: "email",
      placeholder: "John@email.com",
      required: true,
      isLanding: false,
      delay: 0
    },
    {
      id: "03",
      label: "What's the name of your organization?",
      name: "organization",
      type: "text",
      placeholder: "John & Doe.co",
      required: false,
      isLanding: false,
      delay: 0
    },
    {
      id: "04",
      label: "What services are you looking for?",
      name: "services",
      type: "text",
      placeholder: "Branding...",
      required: false,
      isLanding: false,
      delay: 0
    },
    {
      id: "05",
      label: "Your Message",
      name: "message",
      type: "text",
      placeholder: "John think...",
      required: false,
      isTextarea: true,
      isLanding: false,
      delay: 0
    }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen text-zinc-200">
      {/* Hero Image Section */}
      <TextAnimH1 isLanding={true}>
        <div className="relative h-64 bg-gradient-to-b ">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url('/final-images/contact/img1.png')`,
            }}
          />
        </div>
      </TextAnimH1>

      {/* Main Content */}
      <div className="px-30 py-16">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="text-gray-500 text-md mb-4">
              <TextAnimH1 isLanding={true} delay={0.1}>
                Contact us
              </TextAnimH1>
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h1 className="text-7xl lg:text-8xl font-bold">
                <TextAnimH1 isLanding={true} delay={0.1}>
                  Let's Talk
                </TextAnimH1>
              </h1>
              <p className="text-gray-400 text-md">
                <TextAnimP1 isLanding={true} delay={0.1}>
                  Don't be shy / We know you have project in your mind!
                </TextAnimP1>
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Info */}
            <div className="space-y-12">
              {/* Contact Info */}
              <TextAnimP1 isLanding={true} delay={0.2}>
                <div>
                  <p className="text-gray-500 text-sm mb-4">For any query</p>
                  <p className="text-3xl font-semibold mb-2">
                    Info@digicots.com
                  </p>
                  <p className="text-3xl font-semibold">+1 234 567 8901</p>
                </div>
              </TextAnimP1>

              {/* Address */}
              <TextAnimP1>
                <div>
                  <p className="text-gray-500 text-sm mb-4">
                    Headquarter Address
                  </p>
                  <div className="text-md leading-[1.1]">
                    <p>The Line Animation Studio Ltd</p>
                    <p>Studio 02, De Beauvoir Block</p>
                    <p>92-96 De Beauvoir Road</p>
                    <p>London N1 4EN</p>
                  </div>
                </div>
              </TextAnimP1>

              {/* Social Links */}
              <div>
                <p className="text-gray-500 text-sm mb-4">
                  <TextAnimP1>Social</TextAnimP1>
                </p>
                <div className="space-y-1">
                  {[
                    "Blogs",
                    "Linkedin",
                    "Instagram",
                    "Facebook",
                    "Twitter",
                    "Youtube",
                  ].map((item) => (
                    <TextAnimP1>
                      <p
                        key={item}
                        className="text-md font-semibold hover:text-gray-300 cursor-pointer transition-colors pointer-events-auto"
                      >
                        {item}
                      </p>
                    </TextAnimP1>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field, index) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={handleChange}
                    isLanding={field.isLanding}
                    delay={field.delay}
                  />
                ))}

                <TextAnimP1>
                  <div className="flex items-center justify-between gap-4">
                    <hr className="h-1 w-[70%] border-zinc-600" />
                    <button className="w-fit text-white py-3 px-8 border border-zinc-200">
                      Get in touch
                    </button>
                  </div>
                </TextAnimP1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
