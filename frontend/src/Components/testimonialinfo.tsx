interface TestimonialInfoProps {
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  text: string;
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onPhotoUrlChange: (value: string) => void;
  onTextChange: (value: string) => void;
}

export function TestimonialInfo({
  name,
  role,
  company,
  photoUrl,
  text,
  onNameChange,
  onRoleChange,
  onCompanyChange,
  onPhotoUrlChange,
  onTextChange,
}: TestimonialInfoProps) {
  return (
    <form className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Your name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="John Doe"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Your designation</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Manager"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Company</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Acme Inc."
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Photo URL (optional)</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://example.com/avatar.jpg"
          value={photoUrl}
          onChange={(e) => onPhotoUrlChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Text feedback</label>
        <textarea
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a short testimonial about your experience"
          rows={3}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>
    </form>
  );
}