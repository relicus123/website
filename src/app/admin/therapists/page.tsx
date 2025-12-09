"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Therapist {
  _id: string;
  name: string;
  designation: string;
  photo: string;
  price: number;
  bio?: string;
  specialties?: string[];
  isActive: boolean;
  createdAt: string;
}

export default function AdminTherapistsPage() {
  const router = useRouter();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    photo: "",
    price: 0,
    bio: "",
    specialties: "",
    isActive: true,
  });
  const [message, setMessage] = useState("");

  // Fetch therapists
  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/therapists");
      const data = await response.json();

      if (data.success) {
        setTherapists(data.data);
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
      setMessage("Error loading therapists");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        designation: formData.designation,
        photo: formData.photo,
        price: formData.price,
        bio: formData.bio,
        specialties: formData.specialties
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        isActive: formData.isActive,
      };

      console.log("Creating therapist with payload:", payload);

      if (editingId) {
        // Update therapist
        const response = await fetch(`/api/admin/therapists/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          setMessage("Therapist updated successfully");
          setEditingId(null);
          setShowForm(false);
          fetchTherapists();
        } else {
          setMessage("Error updating therapist");
        }
      } else {
        // Create therapist
        const response = await fetch("/api/admin/therapists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          setMessage("Therapist created successfully");
          setShowForm(false);
          setFormData({
            name: "",
            designation: "",
            photo: "",
            price: 0,
            bio: "",
            specialties: "",
            isActive: true,
          });
          fetchTherapists();
        } else {
          setMessage("Error creating therapist");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error saving therapist");
    }
  };

  const handleEdit = (therapist: Therapist) => {
    setFormData({
      name: therapist.name,
      designation: therapist.designation,
      photo: therapist.photo,
      price: therapist.price,
      bio: therapist.bio || "",
      specialties: therapist.specialties?.join(", ") || "",
      isActive: therapist.isActive,
    });
    setEditingId(therapist._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this therapist?")) return;

    try {
      const response = await fetch(`/api/admin/therapists/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Therapist deleted successfully");
        fetchTherapists();
      } else {
        setMessage("Error deleting therapist");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error deleting therapist");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      photo: "",
      price: 0,
      bio: "",
      specialties: "",
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark">
            Manage <span className="text-brand-green">Therapists</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/bookings")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              📅 Manage Bookings
            </button>
            <button
              onClick={() => (showForm ? resetForm() : setShowForm(true))}
              className="px-4 py-2 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-lg transition"
            >
              {showForm ? "Cancel" : "Add Therapist"}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-brand-dark mb-6">
              {editingId ? "Edit Therapist" : "Add New Therapist"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="col-span-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation (e.g., Clinical Psychologist)"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="col-span-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="url"
                name="photo"
                placeholder="Photo URL"
                value={formData.photo}
                onChange={handleInputChange}
                required
                className="col-span-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="number"
                name="price"
                placeholder="Session Price (₹)"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                className="col-span-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="col-span-2 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green min-h-24"
              />

              <input
                type="text"
                name="specialties"
                placeholder="Specialties (comma-separated)"
                value={formData.specialties}
                onChange={handleInputChange}
                className="col-span-2 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <label className="col-span-2 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-brand-dark">Active</span>
              </label>

              <button
                type="submit"
                className="col-span-2 px-4 py-2 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-lg transition"
              >
                {editingId ? "Update Therapist" : "Create Therapist"}
              </button>
            </form>
          </div>
        )}

        {/* Therapists Table */}
        {loading ? (
          <p className="text-center text-brand-dark/60">Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-light border-b border-brand-light">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-dark">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-dark">
                    Designation
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-dark">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-dark">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-dark">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {therapists.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-brand-dark/60"
                    >
                      No therapists found
                    </td>
                  </tr>
                ) : (
                  therapists.map((therapist) => (
                    <tr
                      key={therapist._id}
                      className="border-b border-brand-light hover:bg-brand-light/20"
                    >
                      <td className="px-6 py-4 text-sm text-brand-dark font-medium">
                        {therapist.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-brand-dark/70">
                        {therapist.designation}
                      </td>
                      <td className="px-6 py-4 text-sm text-brand-dark font-semibold">
                        ₹{therapist.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            therapist.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {therapist.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEdit(therapist)}
                          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(therapist._id)}
                          className="text-sm px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
