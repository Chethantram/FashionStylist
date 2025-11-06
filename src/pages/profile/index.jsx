import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import LoaderHanger from "components/Loader";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nameEdit, setNameEdit] = useState(user ? user.name : "");
  const [avatarEdit, setAvatarEdit] = useState(null); //user ? user.avatar :
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setNameEdit(res.data.user.name);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);


  const handleEditClick = () => setIsEditing(true);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarEdit(file);
      setPreviewUrl(URL.createObjectURL(file)); // 👈 create temp preview URL
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        {
          name: nameEdit,
          avatar: avatarEdit,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(res.data.user);
      setIsEditing(false);
      setAvatarEdit(null);
    } catch (error) {
      console.error("Profile update failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <LoaderHanger/>;
  }

  const { name, email, avatar, assessmentData } = user;
  const {
    selectedImages,
    selectedBodyType,
    selectedColors,
    likedOutfits,
    dislikedOutfits,
    budgetData,
  } = assessmentData || {};

  return (
    <motion.div style={{backgroundImage:"url(/background1.png)"}}  initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} className="py-10">
      <div className="flex items-center px-4 gap-4 md:px-20">
        <Link to={"/"}>
          <MoveLeft className="size-6 cursor-pointer " />
        </Link>
        <h1 className="text-2xl font-bold  text-primary">User Profile</h1>
      </div>
      <div className="flex flex-col items-center bg-transparent min-h-screen py-6 px-2">
        <div className="w-full max-w-2xl bg-white/20  border-gray-500/40 border-2 rounded-2xl shadow-lg p-5">
          <div className="mb-2 flex flex-col sm:flex-row items-center gap-4 border-b pb-5">
            <div className="relative border rounded-full border-gray-500/40">
              {/* avatar image */}
              <img
                src={
                  previewUrl
                    ? previewUrl
                    : user && user.avatar
                    ? `http://localhost:5000/uploads/${user?.avatar}`
                    : "https://github.com/shadcn.png"
                }
                alt="avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border object-cover"
              />
              {isEditing && (
                <button
                  className="absolute bottom-0 right-0 bg-brand-gold text-white rounded-full p-1"
                  onClick={() => fileInputRef.current.click()}
                  type="button"
                  aria-label="Edit avatar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15.232 5.232l3.536 3.536M9 19h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a4 4 0 00-4-4H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              {isEditing ? (
                <>
                  <input
                    className="text-md font-medium bg-gray-100 text-primary border border-gray-200 outline-brand-gold  rounded-2xl px-4 py-1 w-44 mb-2"
                    value={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                    disabled={loading}
                  />
                  <div>
                    <button
                      className="text-green-600 border border-green-600 bg-green-100 font-medium text-sm px-5 py-1 rounded-2xl mr-2"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="bg-gray-100 border border-gray-600 px-4 py-1 font-medium rounded-2xl text-gray-800 text-sm"
                      onClick={() => {setIsEditing(false);
                        setPreviewUrl(null);
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold text-primary">
                    {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                  </h1>
                  <p className="text-gray-500 text-sm">{email}</p>
                  <div className="my-2">
                    <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-2xl border border-green-200">
                      Role: {user.role}
                    </span>
                  </div>

                  <div>
                    <button
                      className="mt-1 px-6 py-0.5 rounded-2xl text-sm  bg-brand-gold text-white"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Assessment Section */}
          <div className="mt-6 space-y-6">
            {/* Body Type */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Body Type
              </h2>
              <p className="text-gray-600">
                {selectedBodyType || "Not specified"}
              </p>
            </div>

            {/* Selected Colors */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Color Preferences
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <ColorList
                  title="Favorites"
                  colors={selectedColors?.favorites}
                />
                <ColorList title="Maybe" colors={selectedColors?.maybe} />
                <ColorList title="Avoid" colors={selectedColors?.avoid} />
              </div>
            </div>

            {/* Liked / Disliked Outfits */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Outfits
              </h2>
              <div className="flex flex-wrap gap-4">
                <OutfitList
                  title="Liked"
                  outfits={likedOutfits}
                  color="green"
                />
                <OutfitList
                  title="Disliked"
                  outfits={dislikedOutfits}
                  color="red"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Budget
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p>
                  <strong>Budget:</strong> {budgetData?.budget || "N/A"}
                </p>
                <p>
                  <strong>Monthly Budget:</strong> ₹
                  {budgetData?.monthlyBudget || 0}
                </p>
                {budgetData?.priorities?.length > 0 && (
                  <p>
                    <strong>Priorities:</strong>{" "}
                    {budgetData.priorities.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Selected Images */}
            {selectedImages?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Selected Images
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((img, i) => (
                    <p>{img}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Components
function ColorList({ title, colors }) {
  return (
    <div>
      <h3 className="font-medium text-gray-700">{title}</h3>
      {colors && colors.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((color, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            ></div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 mt-2">No colors selected</p>
      )}
    </div>
  );
}

function OutfitList({ title, outfits, color }) {
  return (
    <div className={`flex-1 min-w-[140px] border-l-4 pl-3 border-${color}-500`}>
      <h3 className={`font-medium text-${color}-600 mb-1`}>{title} Outfits</h3>
      {outfits && outfits.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {outfits.map((outfit, i) => (
            <li key={i}>{outfit}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No outfits</p>
      )}
    </div>
  );
}
