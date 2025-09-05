import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// import { Instagram, Linkedin, Mail, Phone, Twitter, Youtube } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setStatus({ submitting: true, submitted: false, error: false, message: '' });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxF_rfoJe4fTXc2I-0jmn-sp0yXLuN9cUlTmclBdLM74HZdqTFyyjnsb7QrIq3ZCBam/exec';
    
    const body = new FormData();
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('subject', formData.subject);
    body.append('message', formData.message);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: body,
      });

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: false, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setStatus({ submitting: false, submitted: false, error: true, message: `An error occurred: ${errorMessage}` });
    }
  };

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Let's Collaborate</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to collaborate?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12">
  <div className="bg-card rounded-lg p-6 shadow-sm border border-primary/20 max-w-lg mx-auto">
    <h3 className="text-xl font-semibold mb-6 text-foreground text-center">
      Write to us for collaborations
    </h3>
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      {/* Form fields stay the same */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            className="border-primary/20"
            autoComplete="on"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className="border-primary/20"
            autoComplete="on"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
        <Input
          id="subject"
          name="subject"
          placeholder="Message subject"
          className="border-primary/20"
          autoComplete="on"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows={5}
          className="border-primary/20"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={status.submitting}
      >
        {status.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>

    {status.message && (
      <p className={`mt-4 text-sm text-center ${status.error ? 'text-red-500' : 'text-green-500'}`}>
        {status.message}
      </p>
    )}
  </div>
</div>

      </div>
    </section>
  );
}
