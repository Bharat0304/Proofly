interface TestimonialInfoProps {
  name: string;
  role: string;
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export function TestimonialInfo({ name, role, onNameChange, onRoleChange }: TestimonialInfoProps) {
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
        <label className="block text-sm mb-1">Role / Company</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Marketing Lead at Acme Inc."
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        />
      </div>
    </form>
  );
}