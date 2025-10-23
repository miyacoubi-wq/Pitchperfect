import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', role: '', project_type: 'Writer', deliverables: '', tone: 'Professional', contract_attached: false });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setOutput(data.output);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">PitchPerfect – Freelance Proposal Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <input name="role" placeholder="Your Role (e.g., Copywriter, Developer)" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <select name="project_type" onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>Writer</option>
            <option>Developer</option>
            <option>UX Designer</option>
            <option>Social Media Manager</option>
            <option>SEO Specialist</option>
          </select>
          <textarea name="deliverables" placeholder="Describe the project deliverables..." onChange={handleChange} className="w-full p-2 border rounded-lg"></textarea>
          <select name="tone" onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option>Professional</option>
            <option>Friendly</option>
            <option>Persuasive</option>
          </select>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="contract_attached" onChange={handleChange} /> Include service agreement
          </label>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            {loading ? 'Generating...' : 'Generate Proposal'}
          </button>
        </form>
        {output && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
            <h2 className="font-semibold mb-2 text-gray-800">Generated Proposal:</h2>
            {output}
          </div>
        )}
      </div>
    </main>
  );
}